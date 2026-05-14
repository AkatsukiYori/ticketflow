import path from "path";
import prisma from "../../prisma";
import fs from "fs"

export const FileUploaderDAO = async (files: any, module: string, mode: string, document: number) => {
    try {
        if(!files) return null;

        return await prisma.$transaction(async (tx) => {
            const data = {
                filename: files.fileName,
                created_at: new Date(),
                updated_at: new Date(),
                file_path: files.filePath,
                mimetypes: files.fileType,
                size: files.fileSize
            }

            const moduleMap: any = {
                documentation: tx.documentation_files,
                tickets: tx.images
            };

            const moduleName = moduleMap[module as keyof typeof moduleMap];

            if(moduleName) {
                if(mode === "create") {
                    return await moduleName.create({
                        data: data
                    });
                }

                if(mode === "edit" || mode === "update") {
                    if(!document) return null;
                    const checkFiles = await moduleName.findFirst({
                        where: {
                            document_id: document
                        }
                    });

                    if(checkFiles) {
                        return await moduleName.update({
                            where: { document_id: document },
                            data: data
                        });
                    } else {
                        const newData = {
                            ...data,
                            document_id: document
                        }
                        return await moduleName.create({
                            data: newData
                        });
                    }
                }
            }

            return null;
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const FileRevertDAO = async (document: number, module: string) => {
    try {
        return await prisma.$transaction(async (tx) => {
            const moduleMap: any = {
                documentation: tx.documentation_files,
                ticket: tx.images
            };

            const moduleName = moduleMap[module as keyof typeof moduleMap];
            
            if(moduleName) {
                const file = await moduleName.findUnique({
                    where: {
                        id: document
                    }
                });
    
                if(!file) {
                    return null;
                }
    
                const filePath = path.join(
                    process.cwd(),
                    "uploads",
                    module,
                    file.filename
                );
    
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
    
                await moduleName.delete({
                    where: {
                        document_id: document
                    }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
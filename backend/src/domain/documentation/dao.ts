import { Prisma } from "@prisma/client";
import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
import prisma from "../../prisma";

export const GetDocumentationByIdDAO = async (id: number) => {
    try {
        const data = await prisma.documentation.findUnique({
            where: { id: id }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllDocumentationDAO = async () => {
    try {
        const data = await prisma.documentation.findMany();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateDocumentationDAO = async (data: DocumentationDTO.CreateDocumentationInput, fileData: any) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.DocumentationCreateInput;

        await prisma.$transaction(async (tx) => {
            const document = await tx.documentation.create({
                data: {
                    ...filteredData
                }
            });

            if(fileData) {
                await tx.documentation_files.create({
                    data: {
                        document_id: document.id,
                        filename: fileData.filename,
                        file_path: fileData.file_path,
                        size: fileData.file_size,
                        mimetypes: fileData.file_types
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateDocumentationDAO = async (data: Partial<DocumentationDTO.UpdateDocumentationInput>, id: number, fileData: any) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.DocumentationUpdateInput;

        await prisma.$transaction(async (tx) => {
            await tx.documentation.update({
                where: { id: id },
                data: filteredData
            });

            if(fileData) {
                await tx.documentation_files.updateMany({
                    where: { document_id: id },
                    data: {
                        filename: fileData.filename,
                        file_path: fileData.file_path,
                        size: fileData.file_size,
                        mimetypes: fileData.file_types
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteDocumentationDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.documentation.delete({
                where: { id: id }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
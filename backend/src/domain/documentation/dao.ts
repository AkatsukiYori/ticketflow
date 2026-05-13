import { Prisma } from "@prisma/client";
import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
import prisma from "../../prisma";
import path from "path";
import fs from "fs";

export const GetDocumentationByIdDAO = async (id: number) => {
    try {
        const data = await prisma.documentation.findFirst({
            where: { id: id },
            orderBy: { created_at: "desc" }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllDocumentationDAO = async () => {
    try {
        const data = await prisma.documentation.findMany({
            include: {
                documentation_files: {
                    select: {
                        filename: true
                    }
                }
            },
            orderBy: { created_at: "desc" }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateDocumentationDAO = async (data: any, attachment: number) => {
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

            if(attachment) {
                await tx.documentation_files.update({
                    where: {
                        id: attachment
                    },
                    data: {
                        document_id: document.id
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateDocumentationDAO = async (id: number, data: Partial<DocumentationDTO.UpdateDocumentationInput>, fileData: any) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.DocumentationUpdateInput;

        await prisma.$transaction(async (tx) => {
            await tx.documentation.update({
                where: { id: id },
                data: filteredData
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteDocumentationDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx) => {
            const file = await tx.documentation_files.findUnique({
                where: {
                    document_id: id
                }
            });

            if(file) {
                const filePath = path.join(
                    process.cwd(),
                    "uploads",
                    "documentation",
                    file.filename
                );

                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                await tx.documentation_files.delete({
                    where: {
                        document_id: id
                    }
                });
            }

            await tx.documentation.delete({
                where: { id: id }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
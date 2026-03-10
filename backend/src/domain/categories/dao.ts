import prisma from "../../prisma";

type CreateCategoriesDTOInput = {
    name: string;
}

type UpdateCategoriesDTOInput = {
    id: number;
    name?: string;
}

export const GetAllCategoriesDAO = async () => {
    try {
        const data = await prisma.categories.findMany();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateCategoriesDAO = async (data: CreateCategoriesDTOInput) => {
    try {
        await prisma.categories.create({
            data
        });
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export const UpdateCategoriesDAO = async (data: UpdateCategoriesDTOInput) => {
    try {
        await prisma.categories.update({
            where: { id: data.id },
            data: {
                ...(data.name !== undefined && { name: data.name }),
            }
        })
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export const DeleteCategoriesDAO = async (id: number) => {
    try {
        await prisma.categories.delete({
            where: { id: id }
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}
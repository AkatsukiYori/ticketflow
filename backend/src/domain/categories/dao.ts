import { Prisma } from "@prisma/client";
import * as CategoriesDTO from "../../dtos/categories/categories_dto";
import prisma from "../../prisma";
import { unknown } from "zod";


export const GetAllCategoriesDAO = async () => {
    try {
        const data = await prisma.categories.findMany({
            where: {
                deleted_at: null
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateCategoriesDAO = async (data: CategoriesDTO.CreateCategoriesInput) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.CategoriesCreateInput;

        await prisma.$transaction(async (tx) => {
            await tx.categories.create({
                data: {
                    ...filteredData
                }
            });
        });
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export const UpdateCategoriesDAO = async (data: Partial<CategoriesDTO.UpdateCategoriesInput>, id: number) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.CategoriesUpdateInput;

        await prisma.$transaction(async (tx) => {
            await tx.categories.update({
                where: { id: id },
                data: filteredData
            });
        });
    } catch(error: any) {
        throw new Error(error.message);
    }
}

export const DeleteCategoriesDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx) => {
            await prisma.categories.update({
                where: { id: id },
                data: {
                    deleted_at: new Date()
                }
            })
        });

    } catch (error: any) {
        throw new Error(error.message);
    }
}
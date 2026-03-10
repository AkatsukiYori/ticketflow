import { Express, Request, Response } from "express";
import * as CategoriesDAO from "./dao";
import * as CategoriesBodyDTO from "../../dtos/categories/categories_dto";

export const GetAllCategoriesServices = async () => {
    try {
        const data = await CategoriesDAO.GetAllCategoriesDAO();

        return ({ message: data });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateCategoriesServices = async (data: CategoriesBodyDTO.CreateCategoriesBody) => {
    try {
        await CategoriesDAO.CreateCategoriesDAO({
            ...data
        });

        return ({ message: "Kategori berhasil ditambahkan." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateCategoriesServices = async (id: number, data: CategoriesBodyDTO.UpdateCategoriesBody) => {
    try {
        await CategoriesDAO.UpdateCategoriesDAO({
            id: id,
            ...data
        });

        return ({ message: "Kategori berhasil diubah." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteCategoriesServices = async (id: number) => {
    try {
        await CategoriesDAO.DeleteCategoriesDAO(id);
        return ({ message: "Kategori berhasil dihapus." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
import { Express, Request, Response } from "express";
import * as Services from "./services";
import * as CategoriesBodyDTO from "../../dtos/categories/categories_dto";

export const GetAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const data = await Services.GetAllCategoriesServices();
        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        })
    }
}

export const CreateCategoriesController = async (req: Request, res: Response) => {
    try {
        const data = req.body as CategoriesBodyDTO.CreateCategoriesInput;
        const result = await Services.CreateCategoriesServices(data);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const UpdateCategoriesController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const data = req.body as CategoriesBodyDTO.UpdateCategoriesInput;
        const result = await Services.UpdateCategoriesServices(id, data);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const DeleteCategoriesController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await Services.DeleteCategoriesServices(id);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}
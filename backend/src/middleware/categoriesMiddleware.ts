import { Express, NextFunction, Request, Response } from "express";
import * as CategoriesDTO from "../dtos/categories/categories_dto";

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = CategoriesDTO.CreateCategoriesSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }

    req.body = result.data;
    next();
}

export const UpdateCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }

    const result = CategoriesDTO.UpdateCategoriesSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    
    req.body = result.data;
    next();
}

export const DeleteCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }
    
    next();
}
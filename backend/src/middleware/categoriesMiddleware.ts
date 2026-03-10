import { Express, NextFunction, Request, Response } from "express";
import z, { check } from "zod";

const CreateSchema = z.object({
    name: z.string().min(1, "Nama kategori tidak boleh kosong.")
});

const UpdateSchema = z.object({
    name: z.string().optional()
})

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(500).json({
            message: result.error.issues.map(e => e.message),
        });
    }

    req.body = result.data;
    next();
}

export const UpdateCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "ID tidak valid!"
        });
    }

    const result = UpdateSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(500).json({
            message: result.error.issues.map(e => e.message)
        });
    }
    
    req.body = result.data;
    next();
}

export const DeleteCategoriesMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "ID tidak valid!"
        });
    }
    next();
}
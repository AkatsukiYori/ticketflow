import { Request, Response, NextFunction, RequestHandler } from "express";
import z from "zod";

const CreateSchema = z.object({
    username: z.string().min(4, "Username tidak boleh kosong."),
    password: z.string().min(6, "Password tidak boleh kosong."),
    location: z.string().min(1, "Lokasi tidak boleh kosong."),
    isActive: z.boolean()
});

const UpdateSchema = z.object({
    username: z.string().min(4, "Username tidak boleh kosong.").optional(),
    password: z.string().min(6, "Password tidak boleh kosong.").optional(),
    location: z.string("Lokasi tidak boleh kosong").optional(),
    isActive: z.boolean().optional()
});

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateUsersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = CreateSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            message: result.error.issues.map(e => e.message),
        });
    }
    
    req.body = result.data;
    next();
}

export const UpdateUsersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        res.status(500).json({
            message: "ID tidak valid!"
        });
    }

    const result = UpdateSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            message: result.error.issues.map(e => e.message)
        });
    }

    req.body = result.data;
    next();
}

export const DeleteUsersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        res.status(500).json({
            message: "ID tidak valid!"
        });
    }
    next();
}
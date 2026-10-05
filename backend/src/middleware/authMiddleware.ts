import { NextFunction, Request, Response } from "express";
import { LoginSchema } from "../dtos/auth/login_dtos";

export const LoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = LoginSchema.safeParse(req.body);
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
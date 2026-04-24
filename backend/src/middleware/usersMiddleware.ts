import { Request, Response, NextFunction, RequestHandler } from "express";
import * as UsersDTO from "../dtos/users/users_dto";

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const GetUsersByIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        res.status(500).json({
            message: "Invalid ID!"
        });
    }
}

export const CreateUsersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = UsersDTO.CreateUserSchema.safeParse(req.body);
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

    const result = UsersDTO.UpdateUserSchema.safeParse(req.body);
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
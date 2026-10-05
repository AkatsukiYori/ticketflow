import { NextFunction, Request, Response } from "express";
import * as MembersDTO from "../dtos/members/members_dto";

const checkID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateMembersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = MembersDTO.CreateMembersSchema.safeParse(req.body);
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

export const UpdateMembersMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!checkID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID"
        });
    }

    const result = MembersDTO.UpdateMembersSchema.safeParse(req.body);
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

export const DeleteMemberMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!checkID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID"
        });
    }
    
    next();
}
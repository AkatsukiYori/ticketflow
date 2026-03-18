import { NextFunction, Request, Response } from "express";
import * as DocumentationDTO from "../dtos/documentation/documentation_dto";

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const GetDocumentationById = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) return res.status(500).json({ message: "Invalid ID" });
    next();
}

export const CreateDocumentationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = DocumentationDTO.CreateDocumentationSchema.safeParse(req.body);
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

export const UpdateDocumentationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) res.status(500).json({ message: "Invalid ID" });

    const result = DocumentationDTO.UpdateDocumentationSchema.safeParse(req.body);
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

export const DeleteDocumentationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) res.status(500).json({ message: "Invalid ID" });
    next();
}
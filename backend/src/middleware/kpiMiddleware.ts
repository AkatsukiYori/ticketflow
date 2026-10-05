import { NextFunction, Request, Response } from "express";
import * as KpiDTO from "../dtos/kpi/kpi_dto";

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateKpiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = KpiDTO.CreateKpiSchema.safeParse(req.body);
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

export const UpdateKpiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }

    const result = KpiDTO.UpdateKpiSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({
            errir: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }

    req.body = result.data;
    next();
}

export const DeleteKpiMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }
    
    next();
}
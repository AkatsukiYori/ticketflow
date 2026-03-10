import { Express, Request, Response, NextFunction } from "express";
import * as TicketDTO from "../dtos/tickets/tickets_dto";

const CheckID = (id: number) => {
    return Number.isInteger(id) && id > 0;
}

export const CreateTicketMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const result = TicketDTO.CreateTicketSchema.safeParse(req.body);
    
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

export const UpdateTicketMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) res.status(500).json({ message: "ID tidak valid!" });

    const result = TicketDTO.UpdateTicketSchema.safeParse(req.body);
    if(!result.success) {
        res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        })
    }

    req.body = result.data;
    next();
}

export const DeleteTicketMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if(!CheckID(Number(req.params.id))) res.status(500).json({ message: "ID tidak valid!" });
    next();
}
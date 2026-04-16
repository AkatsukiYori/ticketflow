import { Request, Response } from "express";
import * as LogsServices from "./services";

export const GetLogsByTicketController = async (req: Request, res: Response) => {
    try {
        const ticketID = Number(req.params.ticket_id);
        const result = await LogsServices.GetLogsByTicketServices(ticketID);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Something went wrong."
        });
    }
}
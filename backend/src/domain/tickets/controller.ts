import { Express, Request, Response } from "express";
import * as TicketServices from "./services";
import { unlinkFile } from "../../helper/fileHelper";
import * as TicketDTO from "../../dtos/tickets/tickets_dto";

export const GetTicketByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await TicketServices.getTicketById(id);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const GetAllTicketController = async (req: Request, res: Response) => {
    try {
        const result = await TicketServices.GetAllTicketServices();
        
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const CreateTicketController = async (req: Request, res: Response) => {
    const data = req.body as TicketDTO.CreateTicketInput;
    const file = req.file;
    try {
        const result = await TicketServices.CreateTicketServices(data, file);

        res.status(201).json(result);
    } catch (error: any) {
        if(file) {
            try {
                await unlinkFile(`uploads/tickets/${file.filename}`);
            } catch (unlinkError: any) {
                res.status(500).json({ message: "Gagal menghapus file : " + unlinkError.message });
            }
        }

        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const UpdateTicketController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = req. body as TicketDTO.UpdateTicketInput;
    const file = req.file;
    try {
        const result = await TicketServices.UpdateTicketServices(id, data, file);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const DeleteTicketController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await TicketServices.DeleteTicketServices(id);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}
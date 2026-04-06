import { Express, Request, Response } from "express";
import * as TicketServices from "./services";
import { unlinkFile } from "../../helper/fileHelper";
import * as TicketDTO from "../../dtos/tickets/tickets_dto";

export const GetTicketByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await TicketServices.getTicketById(id);
        res.status(200).json(result);
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

export const CreateTicketController = async (req: any, res: Response) => {
    const data = req.body as TicketDTO.CreateTicketInput;
    const file = req.file;
    try {
        const result = await TicketServices.CreateTicketServices(data, file);

        if(req.io) {
            req.io.emit("ticket-change");
        }

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

export const UpdateTicketController = async (req: any, res: Response) => {
    const id = Number(req.params.id);
    const data = req. body as TicketDTO.UpdateTicketInput;
    const file = req.file;
    try {
        const result = await TicketServices.UpdateTicketServices(id, data, file);

        if(req.io) {
            req.io.emit("ticket-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const DeleteTicketController = async (req: any, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await TicketServices.DeleteTicketServices(id);

        if(req.io) {
            req.io.emit("ticket-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const AssignTicketController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const userId = req.body.user_id;

        const result = await TicketServices.AssignTicketServices(ticketNo, Number(userId));

        if(req.io) {
            req.io.emit("ticket-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong : " + error.messaeg });
    }
}

export const RejectTicketController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const reason = req.body.reason;
        const result = await TicketServices.RejectTicketServices(ticketNo, reason);

        if(req.io) {
            req.io.emit("ticket-change");
        }

        res.status(201).json(result);
    }  catch (error: any) {
        res.status(500).json({ message: "Something Went Wrong : " + error.message });
    }
}

export const TicketFeedbackController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { role, reason, user_id } = req.body;
        const result = await TicketServices.TicketFeedbackServices(ticketNo, reason, role, user_id);

        if(req.io) {
            req.io.emit("ticket-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something Went Wrong : " + error.message });
    }
}
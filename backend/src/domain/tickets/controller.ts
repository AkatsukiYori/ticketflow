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
    const filter = req.query
    try {
        const result = await TicketServices.GetAllTicketServices(filter);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const GetFeedbackTicketController = async (req: Request, res: Response) => {
    const ticketNo = String(req.params.ticket_no);
    try {
        const result = await TicketServices.GetFeecbackTicketServices(ticketNo);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const FilterTicketController = async (req: Request, res: Response) => {
    const filterData = req.query;
    try {
        const result = await TicketServices.FilterTicketServices(filterData);

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const GetAllTicketLogs = async (req: Request, res: Response) => {
    try {
        const result = await TicketServices.GetAllTicketLogs();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const GetAllIKBTicketController = async (req: Request, res: Response) => {
    try {
        const result = await TicketServices.GetAllIKBTicketServices();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const CreateTicketController = async (req: any, res: Response) => {
    const { attachment, ...datas } = req.body as TicketDTO.CreateTicketInput;
    try {
        const { message, ticketNo } = await TicketServices.CreateTicketServices(datas, Number(attachment));

        res.status(201).json({ message, ticketNo });
    } catch (error: any) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/tickets/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Gagal menghapus file : " + unlinkError.message });
        //     }
        // }

        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const UpdateTicketController = async (req: any, res: Response) => {
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

export const DeleteTicketController = async (req: any, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = await TicketServices.DeleteTicketServices(id);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const AssignTicketController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { user_id, priority, estimate, point_status } = req.body;

        const result = await TicketServices.AssignTicketServices(ticketNo, Number(user_id), priority as any, estimate, point_status);

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

        res.status(201).json(result);
    }  catch (error: any) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const TicketFeedbackController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { role, reason, user_id, make_doc } = req.body;
        const result = await TicketServices.TicketFeedbackServices(ticketNo, reason, role, make_doc, user_id);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const ClosedTicketController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const result = await TicketServices.ClosedTicketServices(ticketNo);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const ReOpenTicketController = async (req: any, res: Response) => {
    try {
        const ticket_no = req.params.ticket_no;
        const result = await TicketServices.ReOpenTicketServices(ticket_no);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const RatingController = async (req: any, res: Response) => {
    try {
        const ticket_no = req.params.ticket_no;
        const raw_data = req.body
        const data = { ticket_no: ticket_no, ...raw_data };

        const result = await TicketServices.RatingServices(data);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi kesalahan : " + error.message });
    }
}

export const UpdateStatusPointController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const statusPoint = req.body.status_point;

        const result = await TicketServices.UpdateStatusPointServices(id, statusPoint);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong : " + error.message });
    }
}

export const AssignProgrammerController = async (req: any, res: Response) => {
    try {
        const ticketNo = req.params.ticket_no;
        const { user_id, programmer } = req.body;

        const result = await TicketServices.AssignProgrammerServices(ticketNo, Number(user_id), programmer);

        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({
            message: "Something went wrong : " + error.message
        });
    }
}
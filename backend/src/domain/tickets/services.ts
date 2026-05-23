import { Express } from "express";
import * as TicketBodyDTO from "../../dtos/tickets/tickets_dto";
import * as TicketDAO from "./dao";

export const getTicketById = async (id: number) => {
    try {
        const data = await TicketDAO.GetTicketById(id);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllTicketServices = async (filter: any) => {
    try {
        const data = await TicketDAO.GetAllTicketDAO(filter);

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllIKBTicketServices = async () => {
    try {
        const data = await TicketDAO.GetAllIKBTicketDAO();

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const FilterTicketServices = async (filterData: any) => {
    try {
        const data = await TicketDAO.FilterTicketDAO(filterData);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllTicketLogs = async () => {
    try {
        return await TicketDAO.GetAllTicketLogs();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateTicketServices = async (data: any, attachment: number) => {
    try {
        const res = await TicketDAO.CreateTicketDAO(data, attachment);
        return ({ message: "Ticket berhasil dibuat : ", ticketNo: res.ticketNo, logStat: res.logStatus });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateTicketServices = async (id: number, data: TicketBodyDTO.UpdateTicketInput, file: Express.Multer.File | undefined) => {
    try {
        const fileData = file ? {
            filename: file.filename,
            file_path: file.path,
            file_size: file.size,
            file_types: file.mimetype
        } : null;

        await TicketDAO.UpdateTicketDAO(data, id, fileData);

        return ({ messange: "Ticket berhasil diubah." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteTicketServices = async (id: number) => {
    try {
        await TicketDAO.DeleteTicketDAO(id);

        return ({ message: "Ticket Successful Removed." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const AssignTicketServices = async (ticketNo: string, userId: number, priority: any, estimate: Date, point_status: string) => {
    try {
        await TicketDAO.AssignTicketDAO(ticketNo, userId, priority, point_status, estimate);

        return ({ message: "Ticket Successful Assigned." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const RejectTicketServices = async (ticketNo: string, reason: string) => {
    try {
        await TicketDAO.RejectTicketDAO(ticketNo, reason);

        return ({ message: "Ticket Successful Rejected." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const TicketFeedbackServices = async (ticketNo: string, reason: string, role: string, make_doc: boolean, userId?: number) => {
    try {
        await TicketDAO.TicketFeedbackDAO(ticketNo, reason, role, make_doc, userId);

        return ({ message: "Feedback Successful Sent." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const ClosedTicketServices = async (ticketNo: string) => {
    try {
        await TicketDAO.ClosedTicketDAO(ticketNo);

        return ({ message: "Tiket berhasil ditutup." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const ReOpenTicketServices = async (ticketNo: string) => {
    try {
        await TicketDAO.ReOpenTicketDAO(ticketNo);
        return ({ message: "Tiket berhasil dibuka." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const RatingServices = async (data: any) => {
    try {
        await TicketDAO.RatingDAO(data);

        return ({ message: "Terima kasih atas penilaian anda!" });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
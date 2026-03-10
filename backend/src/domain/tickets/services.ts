import { Express } from "express";
import * as TicketBodyDTO from "../../dtos/tickets/tickets_dto";
import * as TicketDAO from "./dao";

export const GetAllTicketServices = async () => {
    try {
        const data = await TicketDAO.GetAllTicketDAO();

        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateTicketServices = async (data: TicketBodyDTO.CreateTicketInput, file: Express.Multer.File | undefined) => {
    try {
        const fileData = file ? {
            filename: file.filename,
            file_path: file.path,
            file_size: file.size,
            file_types: file.mimetype
        } : null;

        await TicketDAO.CreateTicketDAO(data, fileData);
        return ({ message: "Ticket berhasil ditambahkan." });
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

        return ({ message: "Ticket berhasil dihapus." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
import { Priority, TicketStatus, Prisma } from "@prisma/client";
import prisma from "../../prisma";
import * as TicketDTO from "../../dtos/tickets/tickets_dto";
import fs from "fs/promises";

export const GetAllTicketDAO = async () => {
    try {
        const data = await prisma.tickets.findMany();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateTicketDAO = async (data: TicketDTO.CreateTicketInput, fileData: any) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.TicketsCreateInput;

        await prisma.$transaction(async (tx) => {
            const ticket = await tx.tickets.create({
                data: filteredData
            });
    
            if(fileData) {
                await tx.images.create({
                    data: {
                        ticket_id: ticket.id,
                        filename: fileData.filename,
                        file_path: fileData.file_path,
                        size: fileData.file_size,
                        mimetypes: fileData.file_types
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateTicketDAO = async (data: Partial<TicketDTO.UpdateTicketInput>, id: number, fileData: any) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        );

        await prisma.$transaction(async (tx) => {
            const ticket = await tx.tickets.update({
                where: { id: id },
                data: filteredData
            });

            if(fileData) {
                await tx.images.updateMany({
                    where: { ticket_id: id },
                    data: {
                        filename: fileData.filename,
                        file_path: fileData.file_path,
                        size: fileData.file_size,
                        mimetypes: fileData.file_types,
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteTicketDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx) => {
            const dataImages = await tx.images.findMany({
                where: { ticket_id: id },
                select: { 
                    id: true,
                    file_path: true
                 }
            });

            for(const image of dataImages) {
                if(image.file_path) {
                    await fs.unlink(image.file_path).catch(() => {});
                }

                await tx.images.delete({
                    where: { id: image.id }
                });
            }

            await tx.tickets.delete({
                where: { id: id }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
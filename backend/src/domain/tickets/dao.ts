import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import * as TicketDTO from "../../dtos/tickets/tickets_dto";
import fs from "fs/promises";

function MakeDate() {
    return new Date();
}

export const GetTicketById = async (id: number) => {
    try {
        const data = await prisma.tickets.findUnique({
            where: {
                id: id,
                deleted_at: null
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllTicketDAO = async () => {
    try {
        const data = await prisma.tickets.findMany({
            where: {
                deleted_at: null
            }
        });
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

        const date = MakeDate();
        const today = date.toISOString().slice(0, 10).replace(/-/g, '');
        const lastTicket = await prisma.tickets.findFirst({
            where: {
                ticket_no: {
                    startsWith: `TKT-${today}`
                }
            },
            orderBy: {
                ticket_no: "desc"
            }
        });
        let counter = 1;
        if(lastTicket) {
            const parts = lastTicket.ticket_no.split("-");
            const lastNumber = parts[2] ? parseInt(parts[2]) : 0;
            counter = lastNumber + 1;
        }

        const counterStr = String(counter).padStart(3, "0");
        const ticketNo = `TKT-${today}-${counterStr}`;

        await prisma.$transaction(async (tx) => {
            const ticket = await tx.tickets.create({
                data: {
                    ...filteredData,
                    ticket_no: ticketNo,
                    report_date: date
                },
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

            await tx.log.create({
                data: {
                    ticket_id: ticket.id,
                    status: ticket.status,
                    action_type: "create",
                    log_date: MakeDate(),
                    description: ticket.status_reason,
                }
            });
        });

        return ticketNo;
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

            await tx.log.create({
                data: {
                    ticket_id: ticket.id,
                    status: ticket.status,
                    action_type: "update",
                    log_date: MakeDate(),
                    description: ticket.status_reason,
                }
            });
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

            const ticket = await tx.tickets.update({
                where: { id: id },
                data: {
                    deleted_at: MakeDate()
                }
            });

            await tx.log.create({   
                data: {
                    ticket_id: ticket.id ?? null,
                    status: ticket.status,
                    action_type: "delete",
                    log_date: MakeDate(),
                    description: ticket.status_reason,
                }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
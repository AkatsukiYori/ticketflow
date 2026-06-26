import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import * as TicketDTO from "../../dtos/tickets/tickets_dto";
import fs from "fs/promises";
import { includes } from "zod";
import { notifyNewTicket } from "../../services/ticketNotification.service";

function MakeDate() {
    return new Date();
}

export const GetTicketById = async (id: number) => {
    try {
        const data = await prisma.tickets.findFirst({
            include: {
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true, id: true } },
                fk_users_id: { select: { username: true } },
                images: { select: { filename: true } },
                rating: { select: { score: true } }
            },
            where: {
                id: id,
                deleted_at: null
            },
            orderBy: {
                report_date: "desc"
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllTicketDAO = async (filter: any) => {
    const { status, role } = filter;

    const whereClause: any[] = [
        { deleted_at: null }
    ]

    if(role === 'ga') {
        whereClause.push({
            fk_category_id: {
                name: 'hardware'
            }
        })
    }

    const isAdmin = String(status) === "true";

    if(!isAdmin) {
        whereClause.push({
            report_date: {
                gte: new Date(MakeDate().getFullYear(), MakeDate().getMonth(), 1),
                lte: new Date(MakeDate().getFullYear(), MakeDate().getMonth() + 1, 0)
            }
        })
    }

    whereClause.push({
        NOT: {
            OR: [
                {
                    fk_category_id: {
                        name: {
                            contains: "IKB"
                        }
                    }
                },
                {
                    fk_category_id: {
                        name: {
                            contains: "ikb"
                        }
                    },
                }

            ]
        }
    })

    try {
        const data = await prisma.tickets.findMany({
            include: {
                rating: true,
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true } },
                fk_users_id: { select: { username: true } }
            },
            where: { AND: whereClause },
            orderBy: {
                report_date: "desc"
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllIKBTicketDAO = async () => {
    try {
        const data = await prisma.tickets.findMany({
            include: {
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true } },
                fk_users_id: { select: { username: true } }
            },
            where: {
                fk_category_id: {
                    name: {
                        equals: "IKB"
                    }
                },
                deleted_at: null
            },
            orderBy: {
                report_date: "desc"
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const FilterTicketDAO = async (filterData: any) => {
    const { startMonth, endMonth, no, user, title, status } = filterData;

    const whereClause: any = {
        deleted_at: null,
    };

    if(no) {
        whereClause.ticket_no = { contains: no }
    }

    if(user) {
        whereClause.fk_member = {
            username: {
                contains: user
            },
        };
    }

    if(title) {
        whereClause.ticket_title = { contains: title }
    }

    if(startMonth || endMonth) {
        const dateFilter: any = {};

        if(startMonth) {
            const startDate = new Date(startMonth);
            startDate.setHours(0, 0, 0, 0);

            dateFilter.gte = startDate;
        }

        if(endMonth) {
            const endDate = new Date(endMonth);
            endDate.setHours(23, 59, 59, 999);

            dateFilter.lte = endDate;
        }

        whereClause.report_date = dateFilter;
    }


    if(status) {
        if(status === 'closed') {
            whereClause.closed_at = {
                not: null
            };
        } else {
            whereClause.status = status;
            whereClause.closed_at = null;
        }
    }

    try {
        return await prisma.tickets.findMany({
            include: {
                rating: true,
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true } },
                fk_users_id: { select: { username: true } },
                images: { select: { filename: true } },
                log: {
                    select: {
                        auto_closed: true,
                        closed_by: true,
                        description: true,
                        log_date: true,
                        status: true,
                        user_id: true
                    },
                    orderBy: {
                        log_date: "desc"
                    },
                    take: 1
                }
            },
            where: whereClause,
            orderBy: {
                report_date: "desc"
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllTicketLogs = async () => {
    try {
        return await prisma.tickets.findMany({
            include: {
                rating: { select: { score: true } },
                fk_category_id: { select: { name: true } },
                fk_users_id: { select: { username: true } },
                fk_member: { select: { username: true } },
                fk_department: { select:  { name: true } }
            },
            orderBy: {
                report_date: 'desc'
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateTicketDAO = async (data: any, attachment: number) => {
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

        const isIKB = await prisma.categories.findFirst({
            where: {
                id: data.category_id
            }
        });

        return await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.create({
                data: {
                    ...filteredData,
                    ticket_no: ticketNo,
                    report_date: date,
                    modul: isIKB ? (data.modul ? data.modul : null) : null,
                    sub_modul: isIKB ? (data.sub_modul ? data.sub_modul : null) : null
                },
            });

            if(attachment) {
                await tx.images.update({
                    where: { id: attachment },
                    data: { ticket_id: ticket.id }
                });
            }

            const logs = await tx.log.create({
                data: {
                    ticket_id: ticket.id,
                    user_id: ticket.assign_to,
                    status: ticket.status,
                    action_type: "create",
                    log_date: MakeDate(),
                    description: null,
                }
            });

            await notifyNewTicket(ticket.ticket_no);

            return { ticketNo, logStatus: !!logs };
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

        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.update({
                where: { id: id },
                data: filteredData
            });

            if(fileData) {
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
                    user_id: ticket.assign_to,
                    status: ticket.status,
                    action_type: "update",
                    log_date: MakeDate(),
                    description: null,
                }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteTicketDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx: any) => {
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
                    user_id: ticket.assign_to,
                    status: ticket.status,
                    action_type: "delete",
                    log_date: MakeDate(),
                    description: null,
                }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const AssignTicketDAO = async (ticketNo: string, userId: number, priority: any, point_status?: string, estimate?: Date) => {
    try {
        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });
            
            if(ticket) {
                await tx.tickets.update({
                    where: { id: ticket.id },
                    data: {
                        estimate: estimate ? new Date(estimate) : null,
                        assign_to: userId,
                        status: "on_progress",
                        priority: priority,
                        ikb_status_point: point_status ? point_status: null
                    }
                });

                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: userId,
                        status: "on_progress",
                        action_type: "assign",
                        log_date: MakeDate(),
                        description: `Priority : ${priority} | Estimate : ${estimate}`
                    }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const RejectTicketDAO = async (ticketNo: string, reason: string) => {
    try {
        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });

            if(ticket) {
                await tx.tickets.update({
                    where: { id: ticket.id },
                    data: {
                        reject_at: MakeDate(),
                        status: "reject",
                        status_reason: reason
                    }
                });

                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: ticket.assign_to,
                        status: "reject",
                        action_type: "reject",
                        log_date: MakeDate(),
                        description: reason
                    }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const TicketFeedbackDAO = async (ticketNo: string, reason: string, role: string, make_doc?: boolean, userId?: number) => {
    try {
        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });

            if(ticket) {
                await tx.ticketFeedback.create({
                    data: {
                        ticket_id: ticket.id,
                        message: reason,
                        role: role,
                        user_id: userId ?? null,
                        created_at: MakeDate()
                    }
                });

                const payload: any = {};
                if(role === "admin") {
                        payload.status = "completed"
                } else {
                    payload.status = "on_progress"
                }

                await tx.tickets.update({
                    where: {
                        id: ticket.id
                    },
                    data: payload
                });

                if(role === "admin" && make_doc) {
                    await tx.documentation.create({
                        data: {
                            category_id: ticket.category_id,
                            title: ticket.ticket_title,
                            description: reason
                        }
                    });
                }

                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: userId ? userId : null,
                        status: "feedback",
                        action_type: "feedback",
                        log_date: new Date(),
                        description: reason
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const ClosedTicketDAO = async (ticketNo: string) => {
    try {
        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });

            if(ticket) {
                await tx.tickets.update({
                    where: {
                        id: ticket.id
                    },
                    data: {
                        closed_at: MakeDate()
                    }
                });

                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: null,
                        status: "closed",
                        action_type: "closed",
                        log_date: MakeDate(),
                        description: null
                    }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const ReOpenTicketDAO = async (ticketNo: string) => {
    try {
        await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({ where: { ticket_no: ticketNo } });
            if(ticket) {
                await tx.rating.deleteMany({
                    where: { ticket_id: ticket.id }
                });

                await tx.tickets.update({
                    where: {
                        id: ticket.id
                    },
                    data: {
                        closed_at: null,
                        status: "on_progress",
                        reopened_at: MakeDate()
                    }
                });

                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: null,
                        status: "reopen",
                        action_type: "open_ticket",
                        log_date: MakeDate(),
                        description: null
                    }
                });
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const RatingDAO = async (data: any) => {
    try {
        const { ticket_no, score, note } = data;
        return await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticket_no
                }
            });
            
            if(ticket) {
                await tx.rating.create({
                    data: {
                        ticket_id: ticket?.id,
                        score: score,
                        note: note,
                        created_at: new Date()
                    }
                });

                await tx.log.create({
                    data: {
                        ticket_id: ticket?.id,
                        user_id: null,
                        status: "rating",
                        action_type: "rating",
                        log_date: MakeDate(),
                        description: `User memberikan rating ${score} untuk penanganan ticket ini.`
                    }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateStatusPointDAO = async (id: number, statusPoint: string) => {
    try {
        return await prisma.$transaction(async (tx: any) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    id: id
                }
            });

            if(ticket) {
                await tx.tickets.update({
                    where: { id: id },
                    data: { ikb_status_point: statusPoint }
                })
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
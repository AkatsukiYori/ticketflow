"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingDAO = exports.ReOpenTicketDAO = exports.ClosedTicketDAO = exports.TicketFeedbackDAO = exports.RejectTicketDAO = exports.AssignTicketDAO = exports.DeleteTicketDAO = exports.UpdateTicketDAO = exports.CreateTicketDAO = exports.GetAllTicketLogs = exports.FilterTicketDAO = exports.GetAllIKBTicketDAO = exports.GetAllTicketDAO = exports.GetTicketById = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const promises_1 = __importDefault(require("fs/promises"));
function MakeDate() {
    return new Date();
}
const GetTicketById = async (id) => {
    try {
        const data = await prisma_1.default.tickets.findFirst({
            include: {
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true, id: true } },
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetTicketById = GetTicketById;
const GetAllTicketDAO = async (filter) => {
    const { status } = filter;
    const whereClause = [
        { deleted_at: null }
    ];
    const isAdmin = String(status) === "true";
    if (!isAdmin) {
        whereClause.push({
            report_date: {
                gte: new Date(MakeDate().getFullYear(), MakeDate().getMonth(), 1),
                lte: new Date(MakeDate().getFullYear(), MakeDate().getMonth() + 1, 0)
            }
        });
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
    });
    try {
        const data = await prisma_1.default.tickets.findMany({
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllTicketDAO = GetAllTicketDAO;
const GetAllIKBTicketDAO = async () => {
    try {
        const data = await prisma_1.default.tickets.findMany({
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
                }
            },
            orderBy: {
                report_date: "desc"
            }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllIKBTicketDAO = GetAllIKBTicketDAO;
const FilterTicketDAO = async (filterData) => {
    const { startMonth, endMonth, no, user } = filterData;
    const whereClause = {
        deleted_at: null,
    };
    if (no) {
        whereClause.ticket_no = { contains: no };
    }
    if (user) {
        whereClause.fk_member = {
            username: {
                contains: user
            },
        };
    }
    if (startMonth || endMonth) {
        const dateFilter = {};
        if (startMonth) {
            const startDate = new Date(startMonth);
            startDate.setHours(0, 0, 0, 0);
            dateFilter.gte = startDate;
        }
        if (endMonth) {
            const endDate = new Date(endMonth);
            endDate.setHours(23, 59, 59, 999);
            dateFilter.lte = endDate;
        }
        whereClause.report_date = dateFilter;
    }
    try {
        return await prisma_1.default.tickets.findMany({
            include: {
                rating: true,
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } },
                fk_category_id: { select: { name: true } }
            },
            where: whereClause,
            orderBy: {
                report_date: "desc"
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.FilterTicketDAO = FilterTicketDAO;
const GetAllTicketLogs = async () => {
    try {
        return await prisma_1.default.tickets.findMany({
            include: {
                rating: { select: { score: true } },
                fk_category_id: { select: { name: true } },
                fk_users_id: { select: { username: true } },
                fk_member: { select: { username: true } },
                fk_department: { select: { name: true } }
            },
            orderBy: {
                report_date: 'desc'
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllTicketLogs = GetAllTicketLogs;
const CreateTicketDAO = async (data, attachment) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        const date = MakeDate();
        const today = date.toISOString().slice(0, 10).replace(/-/g, '');
        const lastTicket = await prisma_1.default.tickets.findFirst({
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
        if (lastTicket) {
            const parts = lastTicket.ticket_no.split("-");
            const lastNumber = parts[2] ? parseInt(parts[2]) : 0;
            counter = lastNumber + 1;
        }
        const counterStr = String(counter).padStart(3, "0");
        const ticketNo = `TKT-${today}-${counterStr}`;
        const isIKB = await prisma_1.default.categories.findFirst({
            where: {
                id: data.category_id
            }
        });
        return await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.create({
                data: {
                    ...filteredData,
                    ticket_no: ticketNo,
                    report_date: date,
                    modul: isIKB ? (data.modul ? data.modul : null) : null,
                    sub_modul: isIKB ? (data.sub_modul ? data.sub_modul : null) : null
                },
            });
            if (attachment) {
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
            return { ticketNo, logStatus: !!logs };
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateTicketDAO = CreateTicketDAO;
const UpdateTicketDAO = async (data, id, fileData) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.update({
                where: { id: id },
                data: filteredData
            });
            if (fileData) {
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateTicketDAO = UpdateTicketDAO;
const DeleteTicketDAO = async (id) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const dataImages = await tx.images.findMany({
                where: { ticket_id: id },
                select: {
                    id: true,
                    file_path: true
                }
            });
            for (const image of dataImages) {
                if (image.file_path) {
                    await promises_1.default.unlink(image.file_path).catch(() => { });
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteTicketDAO = DeleteTicketDAO;
const AssignTicketDAO = async (ticketNo, userId, priority, estimate) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });
            if (ticket) {
                await tx.tickets.update({
                    where: { id: ticket.id },
                    data: {
                        estimate: estimate ? new Date(estimate) : null,
                        assign_to: userId,
                        status: "on_progress",
                        priority: priority
                    }
                });
                await tx.log.create({
                    data: {
                        ticket_id: ticket.id,
                        user_id: ticket.assign_to,
                        status: "on_progress",
                        action_type: "assign",
                        log_date: MakeDate(),
                        description: `Priority : ${priority} | Estimate : ${estimate}`
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.AssignTicketDAO = AssignTicketDAO;
const RejectTicketDAO = async (ticketNo, reason) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });
            if (ticket) {
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
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.RejectTicketDAO = RejectTicketDAO;
const TicketFeedbackDAO = async (ticketNo, reason, role, make_doc, userId) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });
            if (ticket) {
                await tx.ticketFeedback.create({
                    data: {
                        ticket_id: ticket.id,
                        message: reason,
                        role: role,
                        user_id: userId ?? null,
                        created_at: MakeDate()
                    }
                });
                const payload = {};
                if (role === "admin") {
                    payload.status = "completed";
                }
                else {
                    payload.status = "on_progress";
                }
                await tx.tickets.update({
                    where: {
                        id: ticket.id
                    },
                    data: payload
                });
                if (role === "admin" && make_doc) {
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
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.TicketFeedbackDAO = TicketFeedbackDAO;
const ClosedTicketDAO = async (ticketNo) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticketNo
                }
            });
            if (ticket) {
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
                        user_id: ticket.assign_to,
                        status: "closed",
                        action_type: "closed",
                        log_date: MakeDate(),
                        description: null
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ClosedTicketDAO = ClosedTicketDAO;
const ReOpenTicketDAO = async (ticketNo) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({ where: { ticket_no: ticketNo } });
            if (ticket) {
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
                        user_id: ticket.assign_to,
                        status: "reopen",
                        action_type: "open_ticket",
                        log_date: MakeDate(),
                        description: null
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.ReOpenTicketDAO = ReOpenTicketDAO;
const RatingDAO = async (data) => {
    try {
        const { ticket_no, score, note } = data;
        return await prisma_1.default.$transaction(async (tx) => {
            const ticket = await tx.tickets.findFirst({
                where: {
                    ticket_no: ticket_no
                }
            });
            if (ticket) {
                await tx.rating.create({
                    data: {
                        ticket_id: ticket?.id,
                        score: score,
                        note: note,
                        created_at: new Date()
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.RatingDAO = RatingDAO;
//# sourceMappingURL=dao.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLogsByTicketDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GetLogsByTicketDAO = async (ticketID) => {
    try {
        return await prisma_1.default.$transaction(async (tx) => {
            const data = await tx.log.findMany({
                include: {
                    fk_ticket_id: {
                        select: {
                            ticket_no: true,
                            report_date: true
                        }
                    },
                    fk_user_id: {
                        select: {
                            username: true
                        }
                    }
                },
                orderBy: {
                    log_date: "desc"
                },
                where: {
                    ticket_id: ticketID
                }
            });
            return data;
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetLogsByTicketDAO = GetLogsByTicketDAO;
//# sourceMappingURL=dao.js.map
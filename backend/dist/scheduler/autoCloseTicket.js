"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoClosedFunction = autoClosedFunction;
const prisma_1 = __importDefault(require("../prisma"));
async function autoClosedFunction() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 15 * 60 * 1000);
    const tickets = await prisma_1.default.tickets.findMany({
        where: {
            status: "completed",
            closed_at: null,
            ticket_feedback: { some: { created_at: { lte: sevenDaysAgo } } }
        },
        include: {
            ticket_feedback: {
                orderBy: {
                    created_at: "desc"
                },
                take: 1
            }
        }
    });
    for (const ticket of tickets) {
        const latestFeedback = ticket.ticket_feedback[0];
        if (!latestFeedback)
            continue;
        const sevenDaysAgo = new Date(Date.now() - 15 * 60 * 1000);
        if (latestFeedback.created_at <= sevenDaysAgo) {
            await prisma_1.default.tickets.update({
                where: {
                    id: ticket.id
                },
                data: {
                    closed_at: new Date()
                }
            });
            await prisma_1.default.log.create({
                data: {
                    ticket_id: ticket.id,
                    user_id: null,
                    status: "closed",
                    action_type: "closed",
                    log_date: new Date(),
                    description: "Auto closed by System",
                    created_at: new Date(),
                    updated_at: new Date(),
                    auto_closed: true,
                    closed_by: "system"
                }
            });
        }
    }
}
//# sourceMappingURL=autoCloseTicket.js.map
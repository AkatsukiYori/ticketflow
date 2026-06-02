"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoExpiredFunction = autoExpiredFunction;
const prisma_1 = __importDefault(require("../prisma"));
async function autoExpiredFunction() {
    const now = new Date();
    const tickets = await prisma_1.default.tickets.findMany({
        where: {
            status: "completed",
            closed_at: {
                not: null,
                lt: new Date(now.getTime() - 15 * 60 * 1000)
            },
            expired_at: null
        }
    });
    for (const ticket of tickets) {
        await prisma_1.default.tickets.update({
            where: { id: ticket.id },
            data: { expired_at: now }
        });
        await prisma_1.default.log.create({
            data: {
                ticket_id: ticket.id,
                user_id: null,
                status: "expired",
                action_type: "expired",
                log_date: new Date(),
                description: "Ticket expired.",
                created_at: new Date(),
                updated_at: new Date(),
                auto_closed: false,
                closed_by: "system"
            }
        });
    }
}
//# sourceMappingURL=autoExpiredTicket.js.map
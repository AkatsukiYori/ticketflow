"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoExpiredFunction = autoExpiredFunction;
const prisma_1 = __importDefault(require("../prisma"));
async function autoExpiredFunction() {
    const now = new Date();
    const expiredTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const tickets = await prisma_1.default.tickets.findMany({
        where: {
            status: "completed",
            closed_at: {
                not: null,
                lt: expiredTime
            },
            expired_at: null
        },
        select: { id: true }
    });
    await prisma_1.default.tickets.updateMany({
        where: {
            id: {
                in: tickets.map(t => t.id)
            }
        },
        data: { expired_at: now }
    });
    await prisma_1.default.log.createMany({
        data: tickets.map(e => ({
            ticket_id: e.id,
            user_id: null,
            status: "expired",
            action_type: "expired",
            log_date: now,
            description: "Ticket expired.",
            created_at: now,
            updated_at: now,
            auto_closed: false,
            closed_by: "system"
        }))
    });
}
//# sourceMappingURL=autoExpiredTicket.js.map
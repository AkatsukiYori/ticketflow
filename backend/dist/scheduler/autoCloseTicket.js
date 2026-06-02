"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoClosedFunction = autoClosedFunction;
const prisma_1 = __importDefault(require("../prisma"));
async function autoClosedFunction() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 5 * 60 * 1000);
    const tickets = await prisma_1.default.tickets.findMany({
        where: {
            status: "completed",
            closed_at: null,
            ticket_feedback: {
                some: {
                    created_at: { lte: sevenDaysAgo }
                }
            }
        },
        select: { id: true }
    });
    await prisma_1.default.tickets.updateMany({
        where: {
            id: { in: tickets.map(e => e.id) }
        },
        data: {
            closed_at: now
        }
    });
    await prisma_1.default.log.createMany({
        data: tickets.map(e => ({
            ticket_id: e.id,
            user_id: null,
            status: "closed",
            action_type: "closed",
            log_date: now,
            description: "Auto closed by System",
            created_at: now,
            updated_at: now,
            auto_closed: true,
            closed_by: "system"
        }))
    });
}
//# sourceMappingURL=autoCloseTicket.js.map
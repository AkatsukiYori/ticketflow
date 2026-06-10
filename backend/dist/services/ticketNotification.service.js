"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyNewTicket = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const push_service_1 = require("./push.service");
const notifyNewTicket = async (ticketNumber) => {
    const subscriptions = await prisma_1.default.pushSubscription.findMany();
    for (const item of subscriptions) {
        try {
            await (0, push_service_1.sendPushNotification)(item.subscription, "Ticket Baru", `Ticket ${ticketNumber} telah dibuat dan menunggu proses.`, "/ticketflow/admin/ticket");
        }
        catch (error) {
            if (error.statusCode === 404 || error.statusCode === 410) {
                await prisma_1.default.pushSubscription.delete({
                    where: { endpointHash: item.endpointHash }
                });
            }
        }
    }
};
exports.notifyNewTicket = notifyNewTicket;
//# sourceMappingURL=ticketNotification.service.js.map
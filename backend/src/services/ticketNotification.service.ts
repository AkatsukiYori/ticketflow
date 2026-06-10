import prisma from "../prisma"
import { sendPushNotification } from "./push.service";

export const notifyNewTicket = async (ticketNumber: string) => {
    const subscriptions = await prisma.pushSubscription.findMany();

    for(const item of subscriptions) {
        try {
            await sendPushNotification(
                item.subscription as any,
                "Ticket Baru",
                `Ticket ${ticketNumber} telah dibuat dan menunggu proses.`,
                "/ticketflow/admin/ticket"
            );
        } catch (error: any) {
            if(error.statusCode === 404 || error.statusCode === 410) {
                await prisma.pushSubscription.delete({
                    where: { endpointHash: item.endpointHash }
                });
            }
        }
    }
}
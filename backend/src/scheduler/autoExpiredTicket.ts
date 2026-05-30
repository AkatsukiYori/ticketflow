import prisma from "../prisma";

export async function autoExpiredFunction() {
    const now = new Date();

    const tickets = await prisma.tickets.findMany({
        where: {
            status: "completed",
            closed_at: {
                not: null,
                lt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            },
            expired_at: null
        }
    });

    for (const ticket of tickets) {
        await prisma.tickets.update({
            where: { id: ticket.id },
            data: { expired_at: now }
        });

        await prisma.log.create({
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
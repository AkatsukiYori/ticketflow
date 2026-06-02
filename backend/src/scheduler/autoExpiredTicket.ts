import prisma from "../prisma";

export async function autoExpiredFunction() {
    const now = new Date();
    const expiredTime = new Date(now.getTime() - 5 * 60 * 1000);

    const tickets = await prisma.tickets.findMany({
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

    await prisma.tickets.updateMany({
        where: {
            id: {
                in: tickets.map(t => t.id)
            }
        },
        data: { expired_at: now }
    });

    await prisma.log.createMany({
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
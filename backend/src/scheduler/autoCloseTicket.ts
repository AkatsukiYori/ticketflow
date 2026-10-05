import prisma from "../prisma";

export async function autoClosedFunction() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const tickets = await prisma.tickets.findMany({
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

    await prisma.tickets.updateMany({
        where: {
            id: { in: tickets.map(e => e.id) }
        },
        data: {
            closed_at: now
        }
    });

    await prisma.log.createMany({
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
import prisma from "../../prisma";

export const GetLogsByTicketDAO = async (ticketID: number) => {
    try {
        return await prisma.$transaction(async (tx) => {
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
                // where: {
                //     ticket_id: ticketID
                // }
            });
            return data;
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
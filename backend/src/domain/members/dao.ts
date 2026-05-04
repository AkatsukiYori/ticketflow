import prisma from "../../prisma";

export const GetAllMembersDAO = async () => {
    try {
        return prisma.$transaction(async (tx) => {
            return tx.members.findMany({
                select: {
                    id: true,
                    username: true, 
                    active_status: true                   
                },
                where: {
                    active_status: true,
                    deleted_at: null
                },
                orderBy: {
                    username: "asc"
                }
            });
        })
    } catch (error: any) {
        throw new Error(error.any);
    }
}
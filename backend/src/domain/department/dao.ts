import prisma from "../../prisma";

export const GetAllDepartmentDAO = async () => {
    try {
        return await prisma.$transaction(async (tx) => {
            return tx.department.findMany({
                select: {
                    id: true,
                    name: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: {
                    name: "asc"
                }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
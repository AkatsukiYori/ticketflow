import { LoginInput } from "../../dtos/auth/login_dtos";
import prisma from "../../prisma";

export const LoginDAO = async (userData: LoginInput) => {
    try {
        return await prisma.users.findFirst({
            where: {
                username: {
                    equals: userData.username,
                    mode: "insensitive"
                }
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
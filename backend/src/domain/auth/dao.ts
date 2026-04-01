import { LoginInput } from "../../dtos/auth/login_dtos";
import prisma from "../../prisma";

export const LoginDAO = async (userData: LoginInput) => {
    try {
        return await prisma.users.findUnique({
            where: {
                username: userData.username
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
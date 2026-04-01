import prisma from "../../prisma";
import { Location, Prisma } from "@prisma/client";
import * as DTO from "../../dtos/users/users_dto";

export const GetUserByIdDAO = async (id: number) => {
    try {
        const data = await prisma.users.findFirst({
            where: {
                id: id
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetUserByUsernameDAO = async (username: string) => {
    try {
        const data = await prisma.users.findUnique({
            where: {
                username: username
            }
        });
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllUsersDAO = async () => {
    try {
        const data = await prisma.users.findMany();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateUsersDAO = async (data: DTO.CreateUserInput) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_,v]) => v !== undefined)
        ) as unknown as Prisma.UsersCreateInput;

        await prisma.$transaction(async (tx) => {
            await tx.users.create({
                data: filteredData
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateUsersDAO = async (data: Partial<DTO.UpdateUserInput>, id: number) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_,v]) => v !== undefined)
        ) as unknown as Prisma.UsersUpdateInput;

        await prisma.$transaction(async (tx) => {
            await tx.users.update({
                where: { id: id },
                data: filteredData
            })
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteUsersDAO = async (id: number) => {
    try {
        await prisma.users.delete({
            where: {
                id: id
            }
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
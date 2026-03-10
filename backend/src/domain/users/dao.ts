import prisma from "../../prisma";
import { Location } from "@prisma/client";

type CreateUsersDTOInput = {
    username: string;
    password: string;
    location: Location;
    isActive: boolean;
}

type UpdateUsersDTOInput = {
    id: number;
    username?: string;
    password?: string;
    location?: Location;
    isActive?: boolean;
}

export const GetAllUsersDAO = async () => {
    try {
        const data = await prisma.users.findMany();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateUsersDAO = async (data: CreateUsersDTOInput) => {
    try {
        await prisma.users.create({
            data
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateUsersDAO = async (data: UpdateUsersDTOInput) => {
    try {
        const {id, ...updateData} = data;
        await prisma.users.update({
            where: { id: data.id },
            data: updateData

        })
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
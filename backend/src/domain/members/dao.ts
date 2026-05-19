import { Prisma } from "@prisma/client";
import * as MembersDTO from "../../dtos/members/members_dto";
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

export const CreateMembersDAO = async (data: MembersDTO.CreateMembersInput) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
       ) as unknown as Prisma.MembersCreateInput;

        await prisma.$transaction(async (tx) => {
            await tx.members.create({
                data: {
                    ...filteredData
                }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateMembersDAO = async (data: Partial<MembersDTO.UpdateMembersInput>, id: number) => {
    try {
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined)
        ) as unknown as Prisma.MembersUpdateInput;

        await prisma.$transaction(async (tx) => {
            await tx.members.update({
                where: { id: id },
                data: filteredData
            })
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteMembersDAO = async (id: number) => {
    try {
        await prisma.$transaction(async (tx) => {
            await tx.members.update({
                where: { id: id },
                data: { deleted_at: new Date() }
            });
        });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
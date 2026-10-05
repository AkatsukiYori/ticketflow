import * as DAO from "./dao";
import * as MembersDAO from "./dao";
import * as MembersDTO from "../../dtos/members/members_dto";

export const GetAllMembersServices = async () => {
    try {
        return await DAO.GetAllMembersDAO();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateMembersServices = async (data: MembersDTO.CreateMembersInput) => {
    try {
        await MembersDAO.CreateMembersDAO(data);
        return ({ message: "User Successful Created." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateMembersServices = async (data: MembersDTO.UpdateMembersInput, id: number) => {
    try {
        await MembersDAO.UpdateMembersDAO(data, id);
        return ({ message: "User Successful Updated." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteMembersServices = async (id: number) => {
    try {
        await MembersDAO.DeleteMembersDAO(id);
        return ({ message: "User Successful deleted." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
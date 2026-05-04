import * as DAO from "./dao";

export const GetAllMembersServices = async () => {
    try {
        return await DAO.GetAllMembersDAO();
    } catch (error: any) {
        throw new Error(error.message);
    }
}
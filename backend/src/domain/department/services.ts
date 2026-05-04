import * as DAO from "./dao";

export const GetAllDepartmentServices = async () => {
    try {
        return await DAO.GetAllDepartmentDAO();
    } catch (error: any) {
        throw new Error(error.message);
    }
}
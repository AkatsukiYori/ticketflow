import * as DTO from "../../dtos/users/users_dto";
import * as UsersDAO from "./dao";
import bcrypt from "bcryptjs";

const HashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}

export const GetUserByIdServices = async (id: number) => {
    try {
        const data = await UsersDAO.GetUserByIdDAO(id);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetUserByUsernameServices = async (username: string) => {
    try {
        const data = await UsersDAO.GetUserByUsernameDAO(username);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllUsersServices = async () => {
    try {
        const data = await UsersDAO.GetAllUsersDAO();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateUsersServices = async (data: DTO.CreateUserInput) => {
    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        await UsersDAO.CreateUsersDAO({
            ...data,
            password: hashedPassword
        });
    
        return ({ message: "Pengguna berhasil ditambahkan." });
    } catch(error: any) {
        throw new Error(error.message);
    }   
}

export const UpdateUsersServices = async (id: number, data: DTO.UpdateUserInput) => {
    try {
        const dataPass: any = { ...data };
        if(data.password) {
            dataPass.password = await HashPassword(data.password);
        }

        await UsersDAO.UpdateUsersDAO(
            dataPass,
            id
        );

        return ({ message: "Pengguna berhasil diubah." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteUsersServices = async (id: number) => {
    try {
        await UsersDAO.DeleteUsersDAO(id);

        return ({ message: "Pengguna berhasil dihapus." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
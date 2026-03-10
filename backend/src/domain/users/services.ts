import { Express, Request, Response } from "express";
import * as UsersBodyDTO from "../../dtos/users/users_dto";
import * as UsersDAO from "./dao";
const bcrypt = require("bcrypt");

const HashPassword = (password: string) => {
    return bcrypt.hash(password, 10);
}

export const GetAllUsersServices = async () => {
    try {
        const data = await UsersDAO.GetAllUsersDAO();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateUsersServices = async (data: UsersBodyDTO.CreateUsersBody) => {
    try {
        await UsersDAO.CreateUsersDAO({
            ...data,
            password: HashPassword(data.password)
        });
    
        return ({ message: "Pengguna berhasil ditambahkan." });
    } catch(error: any) {
        throw new Error(error.message);
    }   
}

export const UpdateUsersServices = async (id: number, data: UsersBodyDTO.UpdateUsersBody) => {
    try {
        const dataPass: any = { ...data };
        if(data.password) {
            dataPass.password = await HashPassword(data.password);
        }

        await UsersDAO.UpdateUsersDAO({
            id: id,
            ...data,
            ...dataPass
        });

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
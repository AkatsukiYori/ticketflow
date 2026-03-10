import { Express, Request, Response } from "express";
import * as UsersBodyDTO from "../../dtos/users/users_dto";
import * as UsersServices from "./services";

export const GetAllUsersController = async (req: Request, res: Response) => {
    try {
        const result = await UsersServices.GetAllUsersServices();
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        })
    }
}

export const CreateUsersController = async (req: Request, res: Response) => {
    try {
        const data = req.body as UsersBodyDTO.CreateUsersBody;
        const result = await UsersServices.CreateUsersServices(data);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        });
    }
}

export const UpdateUsersController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = req.body as UsersBodyDTO.UpdateUsersBody;

        const result = await UsersServices.UpdateUsersServices(id, data);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        })
    }
}

export const DeleteUsersController = async (req: Request, res: Response) => {
    try {
        const result = await UsersServices.DeleteUsersServices(Number(req.params.id));

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        })
    }
}
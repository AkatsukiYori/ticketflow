import { Request, Response } from "express";
import * as Services from "./services";
import * as MembersDTO from "../../dtos/members/members_dto";

export const GetAllMembersController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllMembersServices();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Terjadi Kesalahan : " + error.message });
    }
}

export const CreateMemberController = async (req: any, res: Response) => {
    try {
        const data = req.body as MembersDTO.CreateMembersInput;
        const result = await Services.CreateMembersServices(data);

        if(req.io) {
            req.io.emit("members-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const UpdateMemberController = async (req: any, res: Response) => {
    try {
        const id = Number(req.params.id);

        const data = req.body as MembersDTO.UpdateMembersInput;
        const result = await Services.UpdateMembersServices(data, id);

        if(req.io) {
            req.io.emit("members-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const DeleteMemberController = async (req: any, res: Response) => {
    try {
        const id = Number(req.body.params);
        const result = Services.DeleteMembersServices(id);

        if(req.io) {
            req.io.emit("members-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
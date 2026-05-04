import { Request, Response } from "express";
import * as Services from "./services";

export const GetAllMembersController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllMembersServices();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
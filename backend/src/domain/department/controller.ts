import { Request, Response } from "express";
import * as Services from "./services";

export const GetAllDepartmentController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllDepartmentServices();

        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
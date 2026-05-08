import { Request, Response } from "express";
import { LoginInput } from "../../dtos/auth/login_dtos";
import { LoginServices } from "./services";

export const LoginController = async (req: Request, res: Response) => {
    try {
        const data = req.body as LoginInput;
        const result = await LoginServices(data);
        if(result.status === "error") {
            res.status(500).json({ message: result.message });
        } else {
            res.status(200).json(result);
        }

    } catch (error: any) {
        res.status(500).json({
            message: "Terjadi Kesalahan : " + error.message
        })
    }
}
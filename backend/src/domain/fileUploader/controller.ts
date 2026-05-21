import { Request, Response } from "express";
import * as Services from "./services";

export const FileUploaderController = async (req: Request, res: Response) => {
    try {
        const module = req.body.module;
        const mode = req.body.mode;
        const document = Number(req.body.document);
        const result = await Services.FileUploaderServices(req.file as any, module, mode, document);

        const resultFilter: any = {
            id: result.savedFile?.id.toString(),
            filename: result.savedFile?.filename.toString(),
        };

        res.status(201).json(resultFilter);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const FileRevertController = async (req: Request, res: Response) => {
    try {
        const { document, module } = req.body;
        const result = await Services.FileRevertServices(document, module);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
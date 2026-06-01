import { Request, Response } from "express";
import * as Services from "./services";
import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
import { unlinkFile } from "../../helper/fileHelper";

export const GetDocumentationByIDController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await Services.GetDocumentationByIdServices(id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Somthing went wrong." });
    }
}

export const GetAllDocumentationController = async (req: Request, res: Response) => {
    try {
        const result = await Services.GetAllDocumentationServices();
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Somthing went wrong." });
    }
}

export const CreateDocumentationController = async (req: any, res: Response) => {
    const { attachment, ...datas } = req.body as DocumentationDTO.CreateDocumentationInput;
    const convertAttachment = Number(attachment)

    try {
        const result = await Services.CreateDocumentationServices(datas, convertAttachment);

        res.status(201).json(result);
    } catch (error: any) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/documentation/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Something went wrong while uploading." });
        //     }
        // }
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const UpdateDocumentationController = async (req: any, res: Response) => {
    const id = Number(req.params.id);
    const { attachmentID, ...datas } = req.body as DocumentationDTO.UpdateDocumentationInput;

    try {
        const result = await Services.UpdateDocumentationServices(id, datas, Number(attachmentID));

        res.status(201).json(result);
    } catch (error: any) {
        console.log(error);
        // if(file) {
        //     try {
        //         await unlinkFile(`uploads/documentation/${file.filename}`);
        //     } catch (unlinkError: any) {
        //         res.status(500).json({ message: "Something went wrong while uploading." })
        //     }
        // }
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const DeleteDocumentationController = async (req: any, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await Services.DeleteDocumentationServices(id);

        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Something went wrong." });
    }
}
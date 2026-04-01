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
    const data = req.body as DocumentationDTO.CreateDocumentationInput;
    const file = req.file;
    try {
        const result = await Services.CreateDocumentationServices(data, file);
        if(req.io) {
            req.io.emit("documentation-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        if(file) {
            try {
                await unlinkFile(`uploads/documentation/${file.filename}`);
            } catch (unlinkError: any) {
                res.status(500).json({ message: "Something went wrong while uploading." });
            }
        }
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const UpdateDocumentationController = async (req: any, res: Response) => {
    const id = Number(req.params.id);
    const data = req.body as DocumentationDTO.UpdateDocumentationInput;
    const file = req.file;
    try {
        const result = await Services.UpdateDocumentationServices(id, data, file);
        if(req.io) {
            req.io.emit("documentation-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        if(file) {
            try {
                await unlinkFile(`uploads/documentation/${file.filename}`);
            } catch (unlinkError: any) {
                res.status(500).json({ message: "Something went wrong while uploading." })
            }
        }
        res.status(500).json({ message: "Something went wrong." });
    }
}

export const DeleteDocumentationController = async (req: any, res: Response) => {
    const id = Number(req.params.id);
    try {
        const result = await Services.DeleteDocumentationServices(id);
        console.log(result);
        if(req.io) {
            req.io.emit("documentation-change");
        }

        res.status(201).json(result);
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
}
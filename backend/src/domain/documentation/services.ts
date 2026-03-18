import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
import * as DAO from "./dao";

export const GetDocumentationByIdServices = async (id: number) => {
    try {
        const data = DAO.GetDocumentationByIdDAO(id);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const GetAllDocumentationServices = async () => {
    try {
        const data = DAO.GetAllDocumentationDAO();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const CreateDocumentationServices = async (data: DocumentationDTO.CreateDocumentationInput, file: Express.Multer.File | undefined) => {
    try {
        const fileData = file ? {
            filename: file.filename,
            file_path: file.path,
            file_size: file.size,
            file_types: file.mimetype
        } : null;
        await DAO.CreateDocumentationDAO(data, fileData);
        return ({ message: "Documentation successful created." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateDocumentationServices = async (id: number, data: DocumentationDTO.UpdateDocumentationInput, file: Express.Multer.File | undefined) => {
    try {
        const fileData = file ? {
            filename: file.filename,
            file_path: file.path,
            file_size: file.size,
            file_types: file.mimetype
        } : null;
        await DAO.UpdateDocumentationDAO(data, id, fileData);
        return ({ message: "Documentation successful updated." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteDocumentationServices = async (id: number) => {
    try {
        await DAO.DeleteDocumentationDAO(id);
        return ({ message: "Documentation successful deleted." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
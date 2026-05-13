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

export const CreateDocumentationServices = async (data: any, attachment: number) => {
    try {
        await DAO.CreateDocumentationDAO(data, attachment);
        return ({ message: "Documentation Successful Created." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const UpdateDocumentationServices = async (id: number, data: any, attachment: number) => {
    try {
        await DAO.UpdateDocumentationDAO(id, data, attachment);
        return ({ message: "Documentation Successful Updated." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const DeleteDocumentationServices = async (id: number) => {
    try {
        await DAO.DeleteDocumentationDAO(id);
        return ({ message: "Documentation Successful Deleted." });
    } catch (error: any) {
        throw new Error(error.message);
    }
}
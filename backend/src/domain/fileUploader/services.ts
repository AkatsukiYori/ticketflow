import * as DAO from "./dao";

export const FileUploaderServices = async (file: Express.Multer.File, module: string, mode: string, document: number) => {
    try {
        if(!file) {
            return ({ message: "No file uploaded!" });
        }

        const files = {
            "fileName": file.filename,
            "fileType": file.mimetype,
            "filePath": file.path,
            "fileSize": file.size
        }

        const savedFile = await DAO.FileUploaderDAO(files, module, mode, document);
        return ({ savedFile });
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const FileRevertServices = async (document: number, module: string) => {
    try {
        return await DAO.FileRevertDAO(document, module);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
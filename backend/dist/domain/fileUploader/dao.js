"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRevertDAO = exports.FileUploaderDAO = void 0;
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("../../prisma"));
const fs_1 = __importDefault(require("fs"));
const FileUploaderDAO = async (files, module, mode, document) => {
    try {
        if (!files)
            return null;
        return await prisma_1.default.$transaction(async (tx) => {
            const data = {
                filename: files.fileName,
                created_at: new Date(),
                updated_at: new Date(),
                file_path: files.filePath,
                mimetypes: files.fileType,
                size: files.fileSize
            };
            const moduleMap = {
                documentation: tx.documentation_files,
                tickets: tx.images
            };
            const moduleName = moduleMap[module];
            if (moduleName) {
                if (mode === "create") {
                    return await moduleName.create({
                        data: data
                    });
                }
                if (mode === "edit" || mode === "update") {
                    if (!document)
                        return null;
                    const checkFiles = await moduleName.findFirst({
                        where: {
                            document_id: document
                        }
                    });
                    if (checkFiles) {
                        return await moduleName.update({
                            where: { document_id: document },
                            data: data
                        });
                    }
                    else {
                        const newData = {
                            ...data,
                            document_id: document
                        };
                        return await moduleName.create({
                            data: newData
                        });
                    }
                }
            }
            return null;
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.FileUploaderDAO = FileUploaderDAO;
const FileRevertDAO = async (document, module) => {
    try {
        return await prisma_1.default.$transaction(async (tx) => {
            const moduleMap = {
                documentation: tx.documentation_files,
                ticket: tx.images
            };
            const moduleName = moduleMap[module];
            if (moduleName) {
                const file = await moduleName.findUnique({
                    where: {
                        id: document
                    }
                });
                if (!file) {
                    return null;
                }
                const filePath = path_1.default.join(process.cwd(), "uploads", module, file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
                await moduleName.delete({
                    where: {
                        document_id: document
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.FileRevertDAO = FileRevertDAO;
//# sourceMappingURL=dao.js.map
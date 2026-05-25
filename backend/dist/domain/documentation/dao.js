"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDocumentationDAO = exports.UpdateDocumentationDAO = exports.CreateDocumentationDAO = exports.GetAllDocumentationDAO = exports.GetDocumentationByIdDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const GetDocumentationByIdDAO = async (id) => {
    try {
        const data = await prisma_1.default.documentation.findFirst({
            where: { id: id },
            orderBy: { created_at: "desc" }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetDocumentationByIdDAO = GetDocumentationByIdDAO;
const GetAllDocumentationDAO = async () => {
    try {
        const data = await prisma_1.default.documentation.findMany({
            include: {
                documentation_files: {
                    select: {
                        id: true,
                        filename: true
                    }
                }
            },
            orderBy: { created_at: "desc" }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllDocumentationDAO = GetAllDocumentationDAO;
const CreateDocumentationDAO = async (data, attachment) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            const document = await tx.documentation.create({
                data: {
                    ...filteredData
                }
            });
            if (attachment) {
                await tx.documentation_files.update({
                    where: {
                        id: attachment
                    },
                    data: {
                        document_id: document.id
                    }
                });
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateDocumentationDAO = CreateDocumentationDAO;
const UpdateDocumentationDAO = async (id, data, fileData) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.documentation.update({
                where: { id: id },
                data: filteredData
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateDocumentationDAO = UpdateDocumentationDAO;
const DeleteDocumentationDAO = async (id) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            const file = await tx.documentation_files.findUnique({
                where: {
                    document_id: id
                }
            });
            if (file) {
                const filePath = path_1.default.join(process.cwd(), "uploads", "documentation", file.filename);
                if (fs_1.default.existsSync(filePath)) {
                    fs_1.default.unlinkSync(filePath);
                }
                await tx.documentation_files.delete({
                    where: {
                        document_id: id
                    }
                });
            }
            await tx.documentation.delete({
                where: { id: id }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteDocumentationDAO = DeleteDocumentationDAO;
//# sourceMappingURL=dao.js.map
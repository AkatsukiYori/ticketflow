"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoriesDAO = exports.UpdateCategoriesDAO = exports.CreateCategoriesDAO = exports.GetAllCategoriesDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GetAllCategoriesDAO = async () => {
    try {
        const data = await prisma_1.default.categories.findMany({
            where: {
                deleted_at: null
            },
            orderBy: {
                created_at: "desc"
            }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllCategoriesDAO = GetAllCategoriesDAO;
const CreateCategoriesDAO = async (data) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.categories.create({
                data: {
                    ...filteredData
                }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateCategoriesDAO = CreateCategoriesDAO;
const UpdateCategoriesDAO = async (data, id) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.categories.update({
                where: { id: id },
                data: filteredData
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateCategoriesDAO = UpdateCategoriesDAO;
const DeleteCategoriesDAO = async (id) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            await tx.categories.update({
                where: { id: id },
                data: {
                    deleted_at: new Date()
                }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteCategoriesDAO = DeleteCategoriesDAO;
//# sourceMappingURL=dao.js.map
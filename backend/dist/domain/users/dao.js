"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsersDAO = exports.UpdateUsersDAO = exports.CreateUsersDAO = exports.GetAllUsersDAO = exports.GetUserByUsernameDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GetUserByUsernameDAO = async (username) => {
    try {
        const data = await prisma_1.default.users.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                role: true,
            }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetUserByUsernameDAO = GetUserByUsernameDAO;
const GetAllUsersDAO = async () => {
    try {
        const data = await prisma_1.default.users.findMany({
            select: {
                id: true,
                username: true,
                role: true
            }
        });
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllUsersDAO = GetAllUsersDAO;
const CreateUsersDAO = async (data) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.users.create({
                data: filteredData
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateUsersDAO = CreateUsersDAO;
const UpdateUsersDAO = async (data, id) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.users.update({
                where: { id: id },
                data: filteredData
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateUsersDAO = UpdateUsersDAO;
const DeleteUsersDAO = async (id) => {
    try {
        await prisma_1.default.users.delete({
            where: {
                id: id
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteUsersDAO = DeleteUsersDAO;
//# sourceMappingURL=dao.js.map
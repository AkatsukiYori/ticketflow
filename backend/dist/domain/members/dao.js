"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMembersDAO = exports.UpdateMembersDAO = exports.CreateMembersDAO = exports.GetAllMembersDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GetAllMembersDAO = async () => {
    try {
        return prisma_1.default.$transaction(async (tx) => {
            return tx.members.findMany({
                select: {
                    id: true,
                    username: true,
                    active_status: true
                },
                where: {
                    active_status: true,
                    deleted_at: null
                },
                orderBy: {
                    username: "asc"
                }
            });
        });
    }
    catch (error) {
        throw new Error(error.any);
    }
};
exports.GetAllMembersDAO = GetAllMembersDAO;
const CreateMembersDAO = async (data) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.members.create({
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
exports.CreateMembersDAO = CreateMembersDAO;
const UpdateMembersDAO = async (data, id) => {
    try {
        const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined));
        await prisma_1.default.$transaction(async (tx) => {
            await tx.members.update({
                where: { id: id },
                data: filteredData
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateMembersDAO = UpdateMembersDAO;
const DeleteMembersDAO = async (id) => {
    try {
        await prisma_1.default.$transaction(async (tx) => {
            await tx.members.update({
                where: { id: id },
                data: { deleted_at: new Date() }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteMembersDAO = DeleteMembersDAO;
//# sourceMappingURL=dao.js.map
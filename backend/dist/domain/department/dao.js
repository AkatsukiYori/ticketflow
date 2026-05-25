"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDepartmentDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const GetAllDepartmentDAO = async () => {
    try {
        return await prisma_1.default.$transaction(async (tx) => {
            return tx.department.findMany({
                select: {
                    id: true,
                    name: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: {
                    name: "asc"
                }
            });
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllDepartmentDAO = GetAllDepartmentDAO;
//# sourceMappingURL=dao.js.map
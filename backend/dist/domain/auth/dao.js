"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDAO = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const LoginDAO = async (userData) => {
    try {
        return await prisma_1.default.users.findFirst({
            where: {
                username: {
                    equals: userData.username,
                }
            }
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.LoginDAO = LoginDAO;
//# sourceMappingURL=dao.js.map
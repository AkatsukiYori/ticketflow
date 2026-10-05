"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServices = void 0;
const dao_1 = require("./dao");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const LoginServices = async (userData) => {
    try {
        const user = await (0, dao_1.LoginDAO)(userData);
        if (!user) {
            return ({ status: "error", message: "Username atau password salah." });
        }
        const isMatch = await bcryptjs_1.default.compare(userData.password, user.password);
        if (!isMatch) {
            return ({ status: "error", message: "Username atau password salah." });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return ({ status: "error", message: "Terjadi Kesahalan pada token!" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: "2h" });
        return ({
            status: "success",
            message: "Login berhasil!",
            token: token,
            username: user.username,
            location: user.location,
            role: user.role
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.LoginServices = LoginServices;
//# sourceMappingURL=services.js.map
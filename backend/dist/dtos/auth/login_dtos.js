"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.LoginSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, "Username tidak boleh kosong."),
    password: zod_1.default.string().min(1, "Password tidak boleh kosong.")
});
//# sourceMappingURL=login_dtos.js.map
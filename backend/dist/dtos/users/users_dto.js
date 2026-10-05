"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.CreateUserSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
exports.CreateUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, "Username tidak boleh kosong."),
    password: zod_1.default.string().min(1, "Password tidak boleh kosong."),
    location: zod_1.default.enum(client_1.Location, {
        error: "Lokasi tidak boleh kosong."
    }),
    isActive: zod_1.default.boolean({
        error: "Status aktif tidak boleh kosong"
    }),
    role: zod_1.default.enum(client_1.RoleUsers, {
        error: "Role tidak boleh kosong."
    })
});
exports.UpdateUserSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, "Username tidak boleh kosong.").optional(),
    password: zod_1.default.string().min(1, "Password tidak boleh kosong.").optional(),
    location: zod_1.default.enum(client_1.Location, {
        error: "Lokasi tidak boleh kosong."
    }).optional(),
    isActive: zod_1.default.boolean({
        error: "Status aktif tidak boleh kosong"
    }).optional(),
    role: zod_1.default.enum(client_1.RoleUsers, {
        error: "Role tidak boleh kosong."
    }).optional()
});
//# sourceMappingURL=users_dto.js.map
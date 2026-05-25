"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMembersSchema = exports.CreateMembersSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateMembersSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, "Username cannot be empty.")
});
exports.UpdateMembersSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, "Username cannot be empty.").optional()
});
//# sourceMappingURL=members_dto.js.map
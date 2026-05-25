"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentationSchema = exports.CreateDocumentationSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateDocumentationSchema = zod_1.default.object({
    category_id: zod_1.default.coerce.number().min(1, "Category cannot be empty."),
    title: zod_1.default.string().min(1, "Title cannot be empty."),
    description: zod_1.default.string().min(1, "Description cannot be empty."),
    attachment: zod_1.default.coerce.number().nullable().optional()
});
exports.UpdateDocumentationSchema = zod_1.default.object({
    category_id: zod_1.default.coerce.number().min(1, "Category cannot be empty.").optional(),
    title: zod_1.default.string().min(1, "Title cannot be empty.").optional(),
    description: zod_1.default.string().min(1, "Description cannot be empty.").optional(),
    attachment: zod_1.default.coerce.number().nullable().optional()
});
//# sourceMappingURL=documentation_dto.js.map
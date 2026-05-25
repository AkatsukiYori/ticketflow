"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoriesSchema = exports.CreateCategoriesSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateCategoriesSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Category name cannot be empty.")
});
exports.UpdateCategoriesSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Category name cannot be empty.").optional()
});
//# sourceMappingURL=categories_dto.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoriesMiddleware = exports.UpdateCategoriesMiddleware = exports.CreateCategoriesMiddleware = void 0;
const CategoriesDTO = __importStar(require("../dtos/categories/categories_dto"));
const CheckID = (id) => {
    return Number.isInteger(id) && id > 0;
};
const CreateCategoriesMiddleware = (req, res, next) => {
    const result = CategoriesDTO.CreateCategoriesSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    req.body = result.data;
    next();
};
exports.CreateCategoriesMiddleware = CreateCategoriesMiddleware;
const UpdateCategoriesMiddleware = (req, res, next) => {
    if (!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }
    const result = CategoriesDTO.UpdateCategoriesSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    req.body = result.data;
    next();
};
exports.UpdateCategoriesMiddleware = UpdateCategoriesMiddleware;
const DeleteCategoriesMiddleware = (req, res, next) => {
    if (!CheckID(Number(req.params.id))) {
        return res.status(500).json({
            message: "Invalid ID."
        });
    }
    next();
};
exports.DeleteCategoriesMiddleware = DeleteCategoriesMiddleware;
//# sourceMappingURL=categoriesMiddleware.js.map
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
exports.DeleteCategoriesServices = exports.UpdateCategoriesServices = exports.CreateCategoriesServices = exports.GetAllCategoriesServices = void 0;
const CategoriesDAO = __importStar(require("./dao"));
const GetAllCategoriesServices = async () => {
    try {
        const data = await CategoriesDAO.GetAllCategoriesDAO();
        return data;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.GetAllCategoriesServices = GetAllCategoriesServices;
const CreateCategoriesServices = async (data) => {
    try {
        await CategoriesDAO.CreateCategoriesDAO(data);
        return ({ message: "Category Successful Created." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.CreateCategoriesServices = CreateCategoriesServices;
const UpdateCategoriesServices = async (id, data) => {
    try {
        await CategoriesDAO.UpdateCategoriesDAO(data, id);
        return ({ message: "Category Successful Updated." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.UpdateCategoriesServices = UpdateCategoriesServices;
const DeleteCategoriesServices = async (id) => {
    try {
        await CategoriesDAO.DeleteCategoriesDAO(id);
        return ({ message: "Category Successful Deleted." });
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.DeleteCategoriesServices = DeleteCategoriesServices;
//# sourceMappingURL=services.js.map
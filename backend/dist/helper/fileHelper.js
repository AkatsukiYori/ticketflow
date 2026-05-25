"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlinkFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const unlinkFile = async (path) => {
    try {
        await promises_1.default.unlink(path);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.unlinkFile = unlinkFile;
//# sourceMappingURL=fileHelper.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploader = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const createUploader = () => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            const moduleName = req.body.module || "default";
            const uploadPath = path_1.default.join(process.cwd(), "uploads", moduleName);
            if (!fs_1.default.existsSync(uploadPath)) {
                fs_1.default.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    });
    const upload = (0, multer_1.default)({
        storage,
        limits: { fileSize: 20 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            const allowedTypes = /jpg|png|jpeg/;
            const ext = allowedTypes.test(path_1.default.extname(file.originalname).toLocaleLowerCase());
            if (ext) {
                cb(null, true);
            }
            else {
                cb(new Error("Hanya file gambar yang diperbolehkan!"));
            }
        }
    });
    return upload;
};
exports.createUploader = createUploader;
//# sourceMappingURL=uploads.js.map
import path from "path";
import fs from "fs";
import multer from "multer";

export const createUploader = (folder: string) => {
    const uploadPath = path.join("uploads", folder);
    
    if(!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    });
    
    const upload = multer({
        storage,
        limits: { fileSize: 20 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
            const allowedTypes = /jpg|png|jpeg/;
            const ext = allowedTypes.test(path.extname(file.originalname).toLocaleLowerCase());

            if(ext) {
                cb(null, true);
            } else {
                cb(new Error("Hanya file gambar yang diperbolehkan!"));
            }
        }
    });

    return upload;
}
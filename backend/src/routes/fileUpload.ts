import { Router } from "express";
import { createUploader } from "../middleware/uploads";
import * as Controller from "../domain/fileUploader/controller";

const routerFileUpload: Router = Router();
const upload = createUploader();

routerFileUpload.post("/file", upload.single("attachment"), Controller.FileUploaderController);
routerFileUpload.delete("/revert", Controller.FileRevertController);

export default routerFileUpload;
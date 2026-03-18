import { Router } from "express";
import * as Middleware from "../middleware/documentation";
import * as Controller from "../domain/documentation/controller";
import { createUploader } from "../middleware/uploads";

const routerDocumentation: Router = Router();
const upload = createUploader("documentation");

routerDocumentation.get("/get-documentation/:id", Middleware.GetDocumentationById, Controller.GetDocumentationByIDController);
routerDocumentation.get("/get-all-documentation", Controller.GetAllDocumentationController);
routerDocumentation.post("/new-documentation", upload.single("document_file"), Middleware.CreateDocumentationMiddleware, Controller.CreateDocumentationController);
routerDocumentation.put("/update-documentation/:id", upload.single("document_file"), Middleware.UpdateDocumentationMiddleware, Controller.UpdateDocumentationController);
routerDocumentation.delete("/delete-documentation/:id", Middleware.DeleteDocumentationMiddleware, Controller.DeleteDocumentationController);

export default routerDocumentation;
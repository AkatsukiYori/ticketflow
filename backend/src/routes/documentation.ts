import { Router } from "express";
import * as Middleware from "../middleware/documentationMiddleware";
import * as Controller from "../domain/documentation/controller";
import { createUploader } from "../middleware/uploads";

const routerDocumentation: Router = Router();

routerDocumentation.get("/get-documentation/:id", Middleware.GetDocumentationById, Controller.GetDocumentationByIDController);
routerDocumentation.get("/get-all-documentation", Controller.GetAllDocumentationController);
routerDocumentation.post("/new-documentation", Middleware.CreateDocumentationMiddleware, Controller.CreateDocumentationController);
routerDocumentation.put("/update-documentation/:id", Middleware.UpdateDocumentationMiddleware, Controller.UpdateDocumentationController);
routerDocumentation.delete("/delete-documentation/:id", Middleware.DeleteDocumentationMiddleware, Controller.DeleteDocumentationController);

export default routerDocumentation;
import { Router } from "express";
import * as Controller from "../domain/categories/controller";
import * as Middleware from "../middleware/categoriesMiddleware";

const routerCategories: Router = Router();

routerCategories.get("/get-all-categories", Controller.GetAllCategoriesController);
routerCategories.post("/new-categories", Middleware.CreateCategoriesMiddleware, Controller.CreateCategoriesController);
routerCategories.put("/update-categories/:id", Middleware.UpdateCategoriesMiddleware, Controller.UpdateCategoriesController);
routerCategories.delete("/delete-categories/:id", Middleware.DeleteCategoriesMiddleware, Controller.DeleteCategoriesController);

export default routerCategories;
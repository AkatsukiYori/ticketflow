import { Router } from "express";
import * as Controller from "../domain/users/controller";
import * as Middleware from "../middleware/usersMiddleware";
import router from "./main";

const routerUsers: Router = Router();

routerUsers.get("/get-all-user", Controller.GetAllUsersController);
routerUsers.post("/new-user", Middleware.CreateUsersMiddleware, Controller.CreateUsersController);
routerUsers.put("/update-user/:id", Middleware.UpdateUsersMiddleware, Controller.UpdateUsersController);
routerUsers.delete("/delete-user/:id", Middleware.DeleteUsersMiddleware, Controller.DeleteUsersController);

export default routerUsers;
import { Router } from "express";
import * as Controller from "../domain/members/controller";
import * as Middleware from "../middleware/membersMiddleware";

const routerMembers: Router = Router();

routerMembers.get("/get-all-members", Controller.GetAllMembersController);
routerMembers.post("/new-members", Middleware.CreateMembersMiddleware, Controller.CreateMemberController);
routerMembers.put("/update-members/:id", Middleware.UpdateMembersMiddleware, Controller.UpdateMemberController);
routerMembers.put("/delete-members/:id", Middleware.DeleteMemberMiddleware, Controller.DeleteMemberController);

export default routerMembers;
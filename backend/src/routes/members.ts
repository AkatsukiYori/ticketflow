import { Router } from "express";
import * as Controller from "../domain/members/controller";

const routerMembers: Router = Router();

routerMembers.get("/get-all-members", Controller.GetAllMembersController);

export default routerMembers;
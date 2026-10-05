import { Router } from "express";
import * as Controller from "../domain/department/controller";

const routerDepartment: Router = Router();

routerDepartment.get("/get-all-department", Controller.GetAllDepartmentController);

export default routerDepartment;
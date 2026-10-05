import { Router } from "express";
import { LoginController } from "../domain/auth/controller";
import { LoginMiddleware } from "../middleware/authMiddleware";

const routerAuth: Router = Router();

routerAuth.post("/login", LoginMiddleware, LoginController);

export default routerAuth;
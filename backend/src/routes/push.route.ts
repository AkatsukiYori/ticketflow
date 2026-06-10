import { Router } from "express";
import { subscribe } from "../controllers/push.controller";

const routerPushNotification: Router = Router();

routerPushNotification.post("/subscribe", subscribe);

export default routerPushNotification;
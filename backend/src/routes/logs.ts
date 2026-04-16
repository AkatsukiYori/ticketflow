import { Router } from "express";
import * as Controller from "../domain/logs/controller";

const routerLogs: Router = Router();

routerLogs.get("/get-logs-by-ticket/:ticket_id", Controller.GetLogsByTicketController);

export default routerLogs;
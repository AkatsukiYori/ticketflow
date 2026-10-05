import { Router } from "express";
import * as Controller from "../domain/kpi/controller";
import * as Middleware from "../middleware/kpiMiddleware";

const routerKPI: Router = Router();

routerKPI.get("/get-all-kpi", Controller.GetAllKpiController);
routerKPI.get("/check-tickets/:userId", Controller.CheckTicketController);
routerKPI.get("/check-ticket-has-kpi/:kpiId", Controller.CheckTicketHasKpiController);

routerKPI.post("/create", Middleware.CreateKpiMiddleware, Controller.CreateKpiController);
routerKPI.post("/register-ticket/:kpiId", Controller.RegisterTicketController);

routerKPI.put("/unregister-ticket/:kpi_id", Controller.UnregisterTicketController);
routerKPI.put("/update/:id", Middleware.UpdateKpiMiddleware, Controller.UpdateKpiController);
routerKPI.put("/delete/:id", Middleware.DeleteKpiMiddleware, Controller.DeleteKpiController);

routerKPI.delete("/unregister-ticket", Controller.UnregisterTicketController);

export default routerKPI;
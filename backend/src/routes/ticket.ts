import { Router } from "express";
import * as Controller from "../domain/tickets/controller";
import * as Middleware from "../middleware/ticketMiddleware";

const routerTicket: Router = Router();

routerTicket.get("/get-all-ticket", Controller.GetAllTicketController);
routerTicket.get("/get-ticket/:id", Middleware.FetchTicketMiddleware, Controller.GetTicketByIdController);
routerTicket.get("/filter-ticket", Controller.FilterTicketController);
routerTicket.get("/get-all-ticket-logs", Controller.GetAllTicketLogs);

routerTicket.post("/new-ticket", Middleware.CreateTicketMiddleware, Controller.CreateTicketController);
routerTicket.post("/rating/:ticket_no", Controller.RatingController);

routerTicket.put("/assign/:ticket_no", Controller.AssignTicketController);
routerTicket.put("/update-ticket/:id", Middleware.UpdateTicketMiddleware, Controller.UpdateTicketController);
routerTicket.put("/delete-ticket/:id", Middleware.DeleteTicketMiddleware, Controller.DeleteTicketController);
routerTicket.put("/reject-ticket/:ticket_no", Controller.RejectTicketController);
routerTicket.put("/feedback/:ticket_no", Controller.TicketFeedbackController);
routerTicket.put("/close-ticket/:ticket_no", Controller.ClosedTicketController);
routerTicket.put("/re-open/:ticket_no", Controller.ReOpenTicketController);

export default routerTicket;
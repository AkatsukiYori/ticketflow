import { Router } from "express";
import * as Controller from "../domain/tickets/controller";
import * as Middleware from "../middleware/ticketMiddleware";
import { createUploader } from "../middleware/uploads";

const routerTicket: Router = Router();
const upload = createUploader("tickets");

// routerTicket.post("/test", upload.single("ticket_file"), (req, res) => {
//   console.log(req.file);
//   res.json({ ok: true });
// });

routerTicket.get("/get-ticket/:id", Middleware.FetchTicketMiddleware, Controller.GetTicketByIdController);
routerTicket.get("/get-all-ticket", Controller.GetAllTicketController);
routerTicket.post("/new-ticket", upload.single("ticket_file"), Middleware.CreateTicketMiddleware, Controller.CreateTicketController);
routerTicket.put("/update-ticket/:id", upload.single("ticket_file"), Middleware.UpdateTicketMiddleware, Controller.UpdateTicketController);
routerTicket.put("/delete-ticket/:id", Middleware.DeleteTicketMiddleware, Controller.DeleteTicketController);

export default routerTicket;
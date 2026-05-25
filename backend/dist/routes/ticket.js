"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Controller = __importStar(require("../domain/tickets/controller"));
const Middleware = __importStar(require("../middleware/ticketMiddleware"));
const routerTicket = (0, express_1.Router)();
routerTicket.get("/get-all-ticket", Controller.GetAllTicketController);
routerTicket.get("/get-ticket/:id", Middleware.FetchTicketMiddleware, Controller.GetTicketByIdController);
routerTicket.get("/filter-ticket", Controller.FilterTicketController);
routerTicket.get("/get-all-ticket-logs", Controller.GetAllTicketLogs);
routerTicket.get("/get-all-ticket-ikb", Controller.GetAllIKBTicketController);
routerTicket.post("/new-ticket", Middleware.CreateTicketMiddleware, Controller.CreateTicketController);
routerTicket.post("/rating/:ticket_no", Controller.RatingController);
routerTicket.put("/assign/:ticket_no", Controller.AssignTicketController);
routerTicket.put("/update-ticket/:id", Middleware.UpdateTicketMiddleware, Controller.UpdateTicketController);
routerTicket.put("/delete-ticket/:id", Middleware.DeleteTicketMiddleware, Controller.DeleteTicketController);
routerTicket.put("/reject-ticket/:ticket_no", Controller.RejectTicketController);
routerTicket.put("/feedback/:ticket_no", Controller.TicketFeedbackController);
routerTicket.put("/close-ticket/:ticket_no", Controller.ClosedTicketController);
routerTicket.put("/re-open/:ticket_no", Controller.ReOpenTicketController);
exports.default = routerTicket;
//# sourceMappingURL=ticket.js.map
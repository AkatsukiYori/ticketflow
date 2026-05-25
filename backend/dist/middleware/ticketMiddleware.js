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
exports.DeleteTicketMiddleware = exports.UpdateTicketMiddleware = exports.CreateTicketMiddleware = exports.FetchTicketMiddleware = void 0;
const TicketDTO = __importStar(require("../dtos/tickets/tickets_dto"));
const CheckID = (id) => {
    return Number.isInteger(id) && id > 0;
};
const FetchTicketMiddleware = (req, res, next) => {
    if (!CheckID(Number(req.params.id)))
        res.status(500).json({ message: "ID tidak valid!" });
    next();
};
exports.FetchTicketMiddleware = FetchTicketMiddleware;
const CreateTicketMiddleware = (req, res, next) => {
    const result = TicketDTO.CreateTicketSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    req.body = result.data;
    next();
};
exports.CreateTicketMiddleware = CreateTicketMiddleware;
const UpdateTicketMiddleware = (req, res, next) => {
    if (!CheckID(Number(req.params.id)))
        res.status(500).json({ message: "ID tidak valid!" });
    const result = TicketDTO.UpdateTicketSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: result.error.issues.map((e) => ({
                path: e.path,
                message: e.message,
                code: e.code
            }))
        });
    }
    req.body = result.data;
    next();
};
exports.UpdateTicketMiddleware = UpdateTicketMiddleware;
const DeleteTicketMiddleware = (req, res, next) => {
    if (!CheckID(Number(req.params.id)))
        res.status(500).json({ message: "ID tidak valid!" });
    next();
};
exports.DeleteTicketMiddleware = DeleteTicketMiddleware;
//# sourceMappingURL=ticketMiddleware.js.map
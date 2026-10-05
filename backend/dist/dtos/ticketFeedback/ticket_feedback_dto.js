"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketFeedbackCreateSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.TicketFeedbackCreateSchema = zod_1.default.object({
    ticket_id: zod_1.default.number().min(1, "Ticket ID cannot be empty."),
    message: zod_1.default.string().min(1, "Feedback cannot be empty."),
    role: zod_1.default.string().min(1, "Role cannot be empty."),
});
//# sourceMappingURL=ticket_feedback_dto.js.map
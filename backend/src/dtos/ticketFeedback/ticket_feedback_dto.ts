import z from "zod";

export const TicketFeedbackCreateSchema = z.object({
    ticket_id: z.number().min(1, "Ticket ID cannot be empty."),
    message: z.string().min(1, "Feedback cannot be empty."),
    role: z.string().min(1, "Role cannot be empty."),
});

export type TicketFeedbackInput = z.infer<typeof TicketFeedbackCreateSchema>;
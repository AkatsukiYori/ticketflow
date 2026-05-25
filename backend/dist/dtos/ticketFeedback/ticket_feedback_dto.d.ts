import z from "zod";
export declare const TicketFeedbackCreateSchema: z.ZodObject<{
    ticket_id: z.ZodNumber;
    message: z.ZodString;
    role: z.ZodString;
}, z.core.$strip>;
export type TicketFeedbackInput = z.infer<typeof TicketFeedbackCreateSchema>;
//# sourceMappingURL=ticket_feedback_dto.d.ts.map
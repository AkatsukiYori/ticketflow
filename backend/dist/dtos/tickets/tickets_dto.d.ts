import z from "zod";
export declare const CreateTicketSchema: z.ZodObject<{
    assign_to: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    category_id: z.ZodCoercedNumber<unknown>;
    department_id: z.ZodCoercedNumber<unknown>;
    member_id: z.ZodCoercedNumber<unknown>;
    ticket_no: z.ZodOptional<z.ZodString>;
    ticket_title: z.ZodString;
    problem: z.ZodString;
    report_date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    location: z.ZodString;
    priority: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        high: "high";
        mid: "mid";
        low: "low";
    }>>>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<null, "">>]>;
    note: z.ZodOptional<z.ZodString>;
    status: z.ZodEnum<{
        pending: "pending";
        on_progress: "on_progress";
        completed: "completed";
        reject: "reject";
    }>;
    status_reason: z.ZodOptional<z.ZodString>;
    closed_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    deleted_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    modul: z.ZodOptional<z.ZodString>;
    sub_modul: z.ZodOptional<z.ZodString>;
    reopened_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    no_wa: z.ZodOptional<z.ZodString>;
    attachment: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
    programmer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
export declare const UpdateTicketSchema: z.ZodObject<{
    assign_to: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    category_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    department_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    member_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    ticket_no: z.ZodOptional<z.ZodString>;
    ticket_title: z.ZodOptional<z.ZodString>;
    problem: z.ZodOptional<z.ZodString>;
    report_date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    location: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        high: "high";
        mid: "mid";
        low: "low";
    }>>;
    note: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        on_progress: "on_progress";
        completed: "completed";
        reject: "reject";
    }>>;
    status_reason: z.ZodOptional<z.ZodString>;
    closed_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    deleted_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    modul: z.ZodOptional<z.ZodString>;
    sub_modul: z.ZodOptional<z.ZodString>;
    reopened_at: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    no_wa: z.ZodOptional<z.ZodString>;
    attachment: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
    programmer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
//# sourceMappingURL=tickets_dto.d.ts.map
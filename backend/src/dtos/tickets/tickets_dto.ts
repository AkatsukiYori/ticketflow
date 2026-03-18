import { Priority, TicketStatus } from "@prisma/client";
import z from "zod";

export const CreateTicketSchema = z.object({
    assign_to: z.coerce.number().min(1).optional(),
    category_id: z.coerce.number().min(1, "Kategori tidak boleh kosong."),
    ticket_no: z.string().min(1, "No tiket tidak boleh kosong.").optional(),
    ticket_title: z.string().min(1, "Judul tiket tidak boleh kosong."),
    problem: z.string().min(1, "Kendala tidak boleh kosong."),
    report_date: z.coerce.date({
        error: "Tanggal pelaporan tidak boleh kosong"
    }).optional(),
    department: z.string().min(1, "Departemen tidak boleh kosong."),
    location: z.string().min(1, "Lokasi tidak boleh kosong."),
    priority: z.enum(Priority, {
        error: "Prioritas tidak boleh kosong."
    }),
    note: z.string().trim().optional(),
    status: z.enum(TicketStatus, {
        error: "Status tiket tidak boleh kosong."
    }),
    user: z.string().min(1, "Nama Pengguna tidak boleh kosong."),
    status_reason: z.string().trim().optional(),
    closed_at: z.coerce.date().optional(),
    deleted_at: z.coerce.date().optional()
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

export const UpdateTicketSchema = z.object({
    assign_to: z.coerce.number().min(1).optional(),
    category_id: z.coerce.number({
        error: "Kategori tidak boleh kosong."
    }).min(1).optional(),
    ticket_no: z.string().min(1, "No tiket tidak boleh kosong.").optional(),
    ticket_title: z.string().min(1, "Judul tiket tidak boleh kosong.").optional(),
    problem: z.string().min(1, "Kendala tidak boleh kosong.").optional(),
    report_date: z.coerce.date({
        error: "Tanggal pelaporan tidak boleh kosong."
    }).optional(),
    department: z.string().min(1, "Departemen tidak boleh kosong.").optional(),
    location: z.string().min(1, "Lokasi tidak boleh kosong.").optional(),
    priority: z.enum(Priority, {
        error: "Prioritas tidak boleh kosong."
    }).optional(),
    note: z.string().trim().optional(),
    status: z.enum(TicketStatus, {
        error: "Status tiket tidak boleh kosong."
    }).optional(),
    user: z.string().min(1, "Nama Pengguna tidak boleh kosong.").optional(),
    status_reason: z.string().trim().optional(),
    closed_at: z.coerce.date().optional(),
    deleted_at: z.coerce.date().optional()
});

export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
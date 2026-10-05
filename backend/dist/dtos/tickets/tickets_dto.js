"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketSchema = exports.CreateTicketSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
exports.CreateTicketSchema = zod_1.default.object({
    assign_to: zod_1.default.coerce.number().min(1).optional(),
    category_id: zod_1.default.coerce.number().min(1, "Kategori tidak boleh kosong."),
    department_id: zod_1.default.coerce.number().min(1, "Departemen tidak boleh kosong"),
    member_id: zod_1.default.coerce.number().min(1, "Pengguna tidak boleh kosong"),
    ticket_no: zod_1.default.string().min(1, "No tiket tidak boleh kosong.").optional(),
    ticket_title: zod_1.default.string().min(1, "Judul tiket tidak boleh kosong."),
    problem: zod_1.default.string().min(1, "Kendala tidak boleh kosong."),
    report_date: zod_1.default.coerce.date({
        error: "Tanggal pelaporan tidak boleh kosong"
    }).optional(),
    location: zod_1.default.string().min(1, "Lokasi tidak boleh kosong."),
    priority: zod_1.default.nativeEnum(client_1.Priority).optional().nullable().or(zod_1.default.literal("").transform(() => null)),
    note: zod_1.default.string().trim().optional(),
    status: zod_1.default.enum(client_1.TicketStatus, {
        error: "Status tiket tidak boleh kosong."
    }),
    status_reason: zod_1.default.string().trim().optional(),
    closed_at: zod_1.default.coerce.date().optional(),
    deleted_at: zod_1.default.coerce.date().optional(),
    modul: zod_1.default.string().min(1, "Modul tidak boleh kosong.").optional(),
    sub_modul: zod_1.default.string().min(1, "Sub modul tidak boleh kosong.").optional(),
    reopened_at: zod_1.default.coerce.date().optional(),
    no_wa: zod_1.default.string().min(1, "No whatsapp tidak boleh kosong.").optional(),
    attachment: zod_1.default.coerce.number().nullable().optional(),
    programmer: zod_1.default.string().optional()
});
exports.UpdateTicketSchema = zod_1.default.object({
    assign_to: zod_1.default.coerce.number().min(1).optional(),
    category_id: zod_1.default.coerce.number({
        error: "Kategori tidak boleh kosong."
    }).min(1).optional(),
    department_id: zod_1.default.coerce.number().min(1, "Departemen tidak boleh kosong").optional(),
    member_id: zod_1.default.coerce.number().min(1, "Pengguna tidak boleh kosong").optional(),
    ticket_no: zod_1.default.string().min(1, "No tiket tidak boleh kosong.").optional(),
    ticket_title: zod_1.default.string().min(1, "Judul tiket tidak boleh kosong.").optional(),
    problem: zod_1.default.string().min(1, "Kendala tidak boleh kosong.").optional(),
    report_date: zod_1.default.coerce.date({
        error: "Tanggal pelaporan tidak boleh kosong."
    }).optional(),
    location: zod_1.default.string().min(1, "Lokasi tidak boleh kosong.").optional(),
    priority: zod_1.default.enum(client_1.Priority, {
        error: "Prioritas tidak boleh kosong."
    }).optional(),
    note: zod_1.default.string().trim().optional(),
    status: zod_1.default.enum(client_1.TicketStatus, {
        error: "Status tiket tidak boleh kosong."
    }).optional(),
    status_reason: zod_1.default.string().trim().optional(),
    closed_at: zod_1.default.coerce.date().optional(),
    deleted_at: zod_1.default.coerce.date().optional(),
    modul: zod_1.default.string().min(1, "Modul tidak boleh kosong.").optional(),
    sub_modul: zod_1.default.string().min(1, "Sub modul tidak boleh kosong.").optional(),
    reopened_at: zod_1.default.coerce.date().optional(),
    no_wa: zod_1.default.string().min(1, "No whatsapp tidak boleh kosong.").optional(),
    attachment: zod_1.default.coerce.number().nullable().optional(),
    programmer: zod_1.default.string().optional()
});
//# sourceMappingURL=tickets_dto.js.map
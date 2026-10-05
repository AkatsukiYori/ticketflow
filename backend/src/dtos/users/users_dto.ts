import { Location, RoleUsers } from "@prisma/client";
import z from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong."),
    password: z.string().min(1, "Password tidak boleh kosong."),
    location: z.enum(Location, {
        error: "Lokasi tidak boleh kosong."
    }),
    isActive: z.boolean({
        error: "Status aktif tidak boleh kosong"
    }),
    role: z.enum(RoleUsers, {
        error: "Role tidak boleh kosong."
    })
});
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong.").optional(),
    password: z.string().min(1, "Password tidak boleh kosong.").optional(),
    location: z.enum(Location, {
        error: "Lokasi tidak boleh kosong."
    }).optional(),
    isActive: z.boolean({
        error: "Status aktif tidak boleh kosong"
    }).optional(),
    role: z.enum(RoleUsers, {
        error: "Role tidak boleh kosong."
    }).optional()
});
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
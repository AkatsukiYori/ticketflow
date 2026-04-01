import z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, "Username tidak boleh kosong."),
    password: z.string().min(1, "Password tidak boleh kosong.")
});
export type LoginInput = z.infer<typeof LoginSchema>;
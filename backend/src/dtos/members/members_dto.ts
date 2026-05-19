import z from "zod";

export const CreateMembersSchema = z.object({
    username: z.string().min(1, "Username cannot be empty.")
});
export type CreateMembersInput = z.infer<typeof CreateMembersSchema>;

export const UpdateMembersSchema = z.object({
    username: z.string().min(1, "Username cannot be empty.").optional()
});
export type UpdateMembersInput = z.infer<typeof UpdateMembersSchema>;
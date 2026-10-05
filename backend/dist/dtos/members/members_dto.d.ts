import z from "zod";
export declare const CreateMembersSchema: z.ZodObject<{
    username: z.ZodString;
}, z.core.$strip>;
export type CreateMembersInput = z.infer<typeof CreateMembersSchema>;
export declare const UpdateMembersSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateMembersInput = z.infer<typeof UpdateMembersSchema>;
//# sourceMappingURL=members_dto.d.ts.map
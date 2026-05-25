import z from "zod";
export declare const CreateUserSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    location: z.ZodEnum<{
        [x: string]: any;
    }>;
    isActive: z.ZodBoolean;
    role: z.ZodEnum<{
        [x: string]: any;
    }>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof CreateUserSchema>;
export declare const UpdateUserSchema: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodEnum<{
        [x: string]: any;
    }>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    role: z.ZodOptional<z.ZodEnum<{
        [x: string]: any;
    }>>;
}, z.core.$strip>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
//# sourceMappingURL=users_dto.d.ts.map
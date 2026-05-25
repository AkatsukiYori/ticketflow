import z from "zod";
export declare const CreateCategoriesSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateCategoriesInput = z.infer<typeof CreateCategoriesSchema>;
export declare const UpdateCategoriesSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateCategoriesInput = z.infer<typeof UpdateCategoriesSchema>;
//# sourceMappingURL=categories_dto.d.ts.map
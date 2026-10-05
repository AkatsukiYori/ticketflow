import z from "zod";
export declare const CreateDocumentationSchema: z.ZodObject<{
    category_id: z.ZodCoercedNumber<unknown>;
    title: z.ZodString;
    description: z.ZodString;
    attachment: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export type CreateDocumentationInput = z.infer<typeof CreateDocumentationSchema>;
export declare const UpdateDocumentationSchema: z.ZodObject<{
    category_id: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    attachmentID: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export type UpdateDocumentationInput = z.infer<typeof UpdateDocumentationSchema>;
//# sourceMappingURL=documentation_dto.d.ts.map
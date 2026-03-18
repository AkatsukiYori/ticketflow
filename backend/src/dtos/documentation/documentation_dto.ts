import z from "zod";

export const CreateDocumentationSchema = z.object({
    category_id: z.coerce.number().min(1),
    title: z.string().min(1, "Title cannot be empty."),
    description: z.string().min(1, "Description cannot be empty.")
});
export type CreateDocumentationInput = z.infer<typeof CreateDocumentationSchema>;

export const UpdateDocumentationSchema = z.object({
    category_id: z.coerce.number().min(1).optional(),
    title: z.string().min(1, "Title cannot be empty.").optional(),
    description: z.string().min(1, "Description cannot be empty.").optional()
});
export type UpdateDocumentationInput = z.infer<typeof UpdateDocumentationSchema>;
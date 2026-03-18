import z from "zod";

export const CreateCategoriesSchema = z.object({
    name: z.string().min(1, "Category name cannot be empty.")
});
export type CreateCategoriesInput = z.infer<typeof CreateCategoriesSchema>;

export const UpdateCategoriesSchema = z.object({
    name: z.string().min(1, "Category name cannot be empty.").optional()
});
export type UpdateCategoriesInput = z.infer<typeof UpdateCategoriesSchema>;
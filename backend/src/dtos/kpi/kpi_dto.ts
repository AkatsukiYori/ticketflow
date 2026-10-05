import z from "zod";

export const CreateKpiSchema = z.object({
    name: z.string().min(1, "KPI name cannot be empty."),
    formula: z.string().min(1, "Formula cannot be empty."),
    verificator: z.string().min(1, "Verificator cannot be empty."),
    weight: z.coerce.number().min(0, "Weight cannot be empty."),
    year_target: z.coerce.number().min(1, "Yearly target cannot be empty."),
    description: z.array(
        z.string().min(1, "Description cannot be empty.")
    ).min(1, "At least one description inserted."),
    target_status: z.string().min(1, "Target status cannot be empty.")
});
export type CreateKpiInput = z.infer<typeof CreateKpiSchema>;

export const UpdateKpiSchema = z.object({
    name: z.string().min(1, "KPI name cannot be empty.").optional(),
    formula: z.string().min(1, "Formula cannot be empty.").optional(),
    verificator: z.string().min(1, "Verificator cannot be empty.").optional(),
    weight: z.coerce.number().min(1, "Weight cannot be empty.").optional(),
    year_target: z.coerce.number().min(0, "Yearly target cannot be empty.").optional(),
    description: z.array(
        z.string().min(1, "Description cannot be empty.").optional()
    ).optional(),
    target_status: z.string().min(1, "Target status cannot be empty.").optional()
});
export type UpdateKpiInput = z.infer<typeof UpdateKpiSchema>;
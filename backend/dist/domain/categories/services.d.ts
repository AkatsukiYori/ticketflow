import * as CategoriesBodyDTO from "../../dtos/categories/categories_dto";
export declare const GetAllCategoriesServices: () => Promise<{
    name: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}[]>;
export declare const CreateCategoriesServices: (data: CategoriesBodyDTO.CreateCategoriesInput) => Promise<{
    message: string;
}>;
export declare const UpdateCategoriesServices: (id: number, data: CategoriesBodyDTO.UpdateCategoriesInput) => Promise<{
    message: string;
}>;
export declare const DeleteCategoriesServices: (id: number) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
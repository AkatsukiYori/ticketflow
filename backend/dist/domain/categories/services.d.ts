import * as CategoriesBodyDTO from "../../dtos/categories/categories_dto";
export declare const GetAllCategoriesServices: () => Promise<any>;
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
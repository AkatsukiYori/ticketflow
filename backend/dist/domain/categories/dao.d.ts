import * as CategoriesDTO from "../../dtos/categories/categories_dto";
export declare const GetAllCategoriesDAO: () => Promise<{
    name: string;
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
}[]>;
export declare const CreateCategoriesDAO: (data: CategoriesDTO.CreateCategoriesInput) => Promise<void>;
export declare const UpdateCategoriesDAO: (data: Partial<CategoriesDTO.UpdateCategoriesInput>, id: number) => Promise<void>;
export declare const DeleteCategoriesDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
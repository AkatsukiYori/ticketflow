import * as CategoriesDTO from "../../dtos/categories/categories_dto";
export declare const GetAllCategoriesDAO: () => Promise<any>;
export declare const CreateCategoriesDAO: (data: CategoriesDTO.CreateCategoriesInput) => Promise<void>;
export declare const UpdateCategoriesDAO: (data: Partial<CategoriesDTO.UpdateCategoriesInput>, id: number) => Promise<void>;
export declare const DeleteCategoriesDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
export declare const GetDocumentationByIdDAO: (id: number) => Promise<{
    id: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    description: string | null;
    category_id: number;
} | null>;
export declare const GetAllDocumentationDAO: () => Promise<({
    documentation_files: {
        id: number;
        filename: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    description: string | null;
    category_id: number;
})[]>;
export declare const CreateDocumentationDAO: (data: any, attachment: number) => Promise<void>;
export declare const UpdateDocumentationDAO: (id: number, data: Partial<DocumentationDTO.UpdateDocumentationInput>, fileData: any) => Promise<void>;
export declare const DeleteDocumentationDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
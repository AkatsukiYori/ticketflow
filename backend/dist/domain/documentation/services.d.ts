export declare const GetDocumentationByIdServices: (id: number) => Promise<{
    id: number;
    created_at: Date;
    updated_at: Date;
    title: string;
    description: string | null;
    category_id: number;
} | null>;
export declare const GetAllDocumentationServices: () => Promise<({
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
export declare const CreateDocumentationServices: (data: any, attachment: number) => Promise<{
    message: string;
}>;
export declare const UpdateDocumentationServices: (id: number, data: any, attachment: number) => Promise<{
    message: string;
}>;
export declare const DeleteDocumentationServices: (id: number) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
import * as DocumentationDTO from "../../dtos/documentation/documentation_dto";
export declare const GetDocumentationByIdDAO: (id: number) => Promise<any>;
export declare const GetAllDocumentationDAO: () => Promise<any>;
export declare const CreateDocumentationDAO: (data: any, attachment: number) => Promise<void>;
export declare const UpdateDocumentationDAO: (id: number, data: Partial<DocumentationDTO.UpdateDocumentationInput>, fileData: any) => Promise<void>;
export declare const DeleteDocumentationDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
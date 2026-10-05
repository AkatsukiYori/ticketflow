import { NextFunction, Request, Response } from "express";
export declare const GetDocumentationById: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const CreateDocumentationMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const UpdateDocumentationMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const DeleteDocumentationMiddleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=documentationMiddleware.d.ts.map
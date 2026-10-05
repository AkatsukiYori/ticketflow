import { Request, Response, NextFunction } from "express";
export declare const GetUsersByIdMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const CreateUsersMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const UpdateUsersMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const DeleteUsersMiddleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=usersMiddleware.d.ts.map
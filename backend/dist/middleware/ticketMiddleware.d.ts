import { Request, Response, NextFunction } from "express";
export declare const FetchTicketMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const CreateTicketMiddleware: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const UpdateTicketMiddleware: (req: Request, res: Response, next: NextFunction) => void;
export declare const DeleteTicketMiddleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=ticketMiddleware.d.ts.map
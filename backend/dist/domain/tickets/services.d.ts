import * as TicketBodyDTO from "../../dtos/tickets/tickets_dto";
export declare const getTicketById: (id: number) => Promise<any>;
export declare const GetAllTicketServices: (filter: any) => Promise<any>;
export declare const GetAllIKBTicketServices: () => Promise<any>;
export declare const FilterTicketServices: (filterData: any) => Promise<any>;
export declare const GetAllTicketLogs: () => Promise<any>;
export declare const CreateTicketServices: (data: any, attachment: number) => Promise<{
    message: string;
    ticketNo: any;
    logStat: any;
}>;
export declare const UpdateTicketServices: (id: number, data: TicketBodyDTO.UpdateTicketInput, file: Express.Multer.File | undefined) => Promise<{
    messange: string;
}>;
export declare const DeleteTicketServices: (id: number) => Promise<{
    message: string;
}>;
export declare const AssignTicketServices: (ticketNo: string, userId: number, priority: any, estimate: Date) => Promise<{
    message: string;
}>;
export declare const RejectTicketServices: (ticketNo: string, reason: string) => Promise<{
    message: string;
}>;
export declare const TicketFeedbackServices: (ticketNo: string, reason: string, role: string, make_doc: boolean, userId?: number) => Promise<{
    message: string;
}>;
export declare const ClosedTicketServices: (ticketNo: string) => Promise<{
    message: string;
}>;
export declare const ReOpenTicketServices: (ticketNo: string) => Promise<{
    message: string;
}>;
export declare const RatingServices: (data: any) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
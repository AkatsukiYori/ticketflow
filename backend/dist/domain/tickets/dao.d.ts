import * as TicketDTO from "../../dtos/tickets/tickets_dto";
export declare const GetTicketById: (id: number) => Promise<any>;
export declare const GetAllTicketDAO: (filter: any) => Promise<any>;
export declare const GetAllIKBTicketDAO: () => Promise<any>;
export declare const FilterTicketDAO: (filterData: any) => Promise<any>;
export declare const GetAllTicketLogs: () => Promise<any>;
export declare const CreateTicketDAO: (data: any, attachment: number) => Promise<any>;
export declare const UpdateTicketDAO: (data: Partial<TicketDTO.UpdateTicketInput>, id: number, fileData: any) => Promise<void>;
export declare const DeleteTicketDAO: (id: number) => Promise<void>;
export declare const AssignTicketDAO: (ticketNo: string, userId: number, priority: any, estimate?: Date) => Promise<void>;
export declare const RejectTicketDAO: (ticketNo: string, reason: string) => Promise<void>;
export declare const TicketFeedbackDAO: (ticketNo: string, reason: string, role: string, make_doc?: boolean, userId?: number) => Promise<void>;
export declare const ClosedTicketDAO: (ticketNo: string) => Promise<void>;
export declare const ReOpenTicketDAO: (ticketNo: string) => Promise<void>;
export declare const RatingDAO: (data: any) => Promise<any>;
//# sourceMappingURL=dao.d.ts.map
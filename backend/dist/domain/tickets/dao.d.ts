import * as TicketDTO from "../../dtos/tickets/tickets_dto";
export declare const GetTicketById: (id: number) => Promise<({
    images: {
        filename: string;
    } | null;
    rating: {
        score: number;
    } | null;
    fk_category_id: {
        name: string;
        id: number;
    };
    fk_users_id: {
        username: string;
    } | null;
    fk_department: {
        name: string;
    } | null;
    fk_member: {
        username: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    category_id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    report_date: Date;
    location: string;
    priority: import("@prisma/client").$Enums.Priority | null;
    note: string | null;
    status: import("@prisma/client").$Enums.TicketStatus;
    status_reason: string | null;
    closed_at: Date | null;
    estimate: Date | null;
    reject_at: Date | null;
    modul: string | null;
    sub_modul: string | null;
    reopened_at: Date | null;
    no_wa: string | null;
    ikb_status_point: string | null;
    expired_at: Date | null;
    assign_to: number | null;
    department_id: number | null;
    member_id: number | null;
}) | null>;
export declare const GetAllTicketDAO: (filter: any) => Promise<({
    rating: {
        id: number;
        created_at: Date;
        note: string | null;
        ticket_id: number;
        score: number;
    } | null;
    fk_category_id: {
        name: string;
    };
    fk_users_id: {
        username: string;
    } | null;
    fk_department: {
        name: string;
    } | null;
    fk_member: {
        username: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    category_id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    report_date: Date;
    location: string;
    priority: import("@prisma/client").$Enums.Priority | null;
    note: string | null;
    status: import("@prisma/client").$Enums.TicketStatus;
    status_reason: string | null;
    closed_at: Date | null;
    estimate: Date | null;
    reject_at: Date | null;
    modul: string | null;
    sub_modul: string | null;
    reopened_at: Date | null;
    no_wa: string | null;
    ikb_status_point: string | null;
    expired_at: Date | null;
    assign_to: number | null;
    department_id: number | null;
    member_id: number | null;
})[]>;
export declare const GetAllIKBTicketDAO: () => Promise<({
    fk_category_id: {
        name: string;
    };
    fk_users_id: {
        username: string;
    } | null;
    fk_department: {
        name: string;
    } | null;
    fk_member: {
        username: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    category_id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    report_date: Date;
    location: string;
    priority: import("@prisma/client").$Enums.Priority | null;
    note: string | null;
    status: import("@prisma/client").$Enums.TicketStatus;
    status_reason: string | null;
    closed_at: Date | null;
    estimate: Date | null;
    reject_at: Date | null;
    modul: string | null;
    sub_modul: string | null;
    reopened_at: Date | null;
    no_wa: string | null;
    ikb_status_point: string | null;
    expired_at: Date | null;
    assign_to: number | null;
    department_id: number | null;
    member_id: number | null;
})[]>;
export declare const FilterTicketDAO: (filterData: any) => Promise<{
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    category_id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    report_date: Date;
    location: string;
    priority: import("@prisma/client").$Enums.Priority | null;
    note: string | null;
    status: import("@prisma/client").$Enums.TicketStatus;
    status_reason: string | null;
    closed_at: Date | null;
    estimate: Date | null;
    reject_at: Date | null;
    modul: string | null;
    sub_modul: string | null;
    reopened_at: Date | null;
    no_wa: string | null;
    ikb_status_point: string | null;
    expired_at: Date | null;
    assign_to: number | null;
    department_id: number | null;
    member_id: number | null;
}[]>;
export declare const GetAllTicketLogs: () => Promise<({
    rating: {
        score: number;
    } | null;
    fk_category_id: {
        name: string;
    };
    fk_users_id: {
        username: string;
    } | null;
    fk_department: {
        name: string;
    } | null;
    fk_member: {
        username: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    category_id: number;
    ticket_no: string;
    ticket_title: string;
    problem: string;
    report_date: Date;
    location: string;
    priority: import("@prisma/client").$Enums.Priority | null;
    note: string | null;
    status: import("@prisma/client").$Enums.TicketStatus;
    status_reason: string | null;
    closed_at: Date | null;
    estimate: Date | null;
    reject_at: Date | null;
    modul: string | null;
    sub_modul: string | null;
    reopened_at: Date | null;
    no_wa: string | null;
    ikb_status_point: string | null;
    expired_at: Date | null;
    assign_to: number | null;
    department_id: number | null;
    member_id: number | null;
})[]>;
export declare const CreateTicketDAO: (data: any, attachment: number) => Promise<{
    ticketNo: string;
    logStatus: boolean;
}>;
export declare const UpdateTicketDAO: (data: Partial<TicketDTO.UpdateTicketInput>, id: number, fileData: any) => Promise<void>;
export declare const DeleteTicketDAO: (id: number) => Promise<void>;
export declare const AssignTicketDAO: (ticketNo: string, userId: number, priority: any, point_status?: string, estimate?: Date) => Promise<void>;
export declare const RejectTicketDAO: (ticketNo: string, reason: string) => Promise<void>;
export declare const TicketFeedbackDAO: (ticketNo: string, reason: string, role: string, make_doc?: boolean, userId?: number) => Promise<void>;
export declare const ClosedTicketDAO: (ticketNo: string) => Promise<void>;
export declare const ReOpenTicketDAO: (ticketNo: string) => Promise<void>;
export declare const RatingDAO: (data: any) => Promise<void>;
export declare const UpdateStatusPointDAO: (id: number, statusPoint: string) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
import * as TicketBodyDTO from "../../dtos/tickets/tickets_dto";
export declare const getTicketById: (id: number) => Promise<({
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
export declare const GetAllTicketServices: (filter: any) => Promise<({
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
export declare const GetAllIKBTicketServices: () => Promise<({
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
export declare const FilterTicketServices: (filterData: any) => Promise<({
    log: {
        description: string | null;
        status: string;
        log_date: Date;
        auto_closed: boolean | null;
        closed_by: string | null;
        user_id: number | null;
    }[];
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
export declare const CreateTicketServices: (data: any, attachment: number) => Promise<{
    message: string;
    ticketNo: string;
    logStat: boolean;
}>;
export declare const UpdateTicketServices: (id: number, data: TicketBodyDTO.UpdateTicketInput, file: Express.Multer.File | undefined) => Promise<{
    messange: string;
}>;
export declare const DeleteTicketServices: (id: number) => Promise<{
    message: string;
}>;
export declare const AssignTicketServices: (ticketNo: string, userId: number, priority: any, estimate: Date, point_status: string) => Promise<{
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
export declare const UpdateStatusPointServices: (id: number, statusPoint: string) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
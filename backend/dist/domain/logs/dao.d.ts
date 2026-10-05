export declare const GetLogsByTicketDAO: (ticketID: number) => Promise<({
    fk_ticket_id: {
        ticket_no: string;
        report_date: Date;
    };
    fk_user_id: {
        username: string;
    } | null;
} & {
    id: number;
    created_at: Date;
    updated_at: Date;
    description: string | null;
    status: string;
    action_type: string;
    log_date: Date;
    auto_closed: boolean | null;
    closed_by: string | null;
    ticket_id: number;
    user_id: number | null;
})[]>;
//# sourceMappingURL=dao.d.ts.map
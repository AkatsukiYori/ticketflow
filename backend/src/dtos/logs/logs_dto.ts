export interface CreateLogsBody {
    status: String;
    action_type: String;
    log_date: Date;
    description?: String;
}
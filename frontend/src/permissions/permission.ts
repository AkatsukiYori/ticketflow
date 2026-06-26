export const Permission = {
    ASSIGN: 'ticket.assign',
    FEEDBACK: 'ticket.feedback',
    REJECT: 'ticket.reject',
    REMOVE: 'ticket.remove',
    REOPEN: 'ticket.reopen',
    EDIT: 'ticket.edit',

    DASHBOARD: 'menu.dashboard',
    TICKET: 'menu.ticket',
    IKB: 'menu.ikb',
    CATEGORY: 'menu.category',
    USERS: 'menu.users',
    DOCUMENTATION: 'menu.documentation',
    REPORT: 'menu.report',
    LOGS: 'menu.logs',
} as const;

export type PermissionType = typeof Permission[keyof typeof Permission];


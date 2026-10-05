import { Permission } from "./permission";
import type { UserRole } from "./role";

export const RolePermission: Record<UserRole, string[]> = {
    admin: [
        Permission.ASSIGN,
        Permission.FEEDBACK,
        Permission.REJECT,
        Permission.REMOVE,
        Permission.REOPEN,
        Permission.EDIT,

        Permission.DASHBOARD,
        Permission.TICKET,
        Permission.IKB,
        Permission.CATEGORY,
        Permission.USERS,
        Permission.DOCUMENTATION,
        Permission.REPORT,
        Permission.LOGS,
    ],
    ga: [
        Permission.ASSIGN,
        Permission.FEEDBACK,
        Permission.REJECT,
        Permission.REMOVE,
        
        Permission.DASHBOARD,
        Permission.TICKET
    ],
    ikb: [
        Permission.FEEDBACK,
        Permission.ASSIGNPROGRAMMER,

        Permission.IKB
    ]
}
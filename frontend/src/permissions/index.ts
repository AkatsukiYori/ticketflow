import type { PermissionType } from "./permission";
import type { UserRole } from "./role";
import { RolePermission } from "./rolePermission";

export const hasPermission = (
    role: UserRole,
    permission: PermissionType
) => {
    console.log("Role = ", role);
    console.log("RolePermission = ", RolePermission);
    console.log("RolePermission[role] = ", RolePermission[role]);

    return RolePermission[role]?.includes(permission) ?? false;
}
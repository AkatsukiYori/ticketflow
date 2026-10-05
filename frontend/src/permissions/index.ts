import type { PermissionType } from "./permission";
import type { UserRole } from "./role";
import { RolePermission } from "./rolePermission";

export const hasPermission = (
    role: UserRole,
    permission: PermissionType
) => {
    return RolePermission[role]?.includes(permission) ?? false;
}
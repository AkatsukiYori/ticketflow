import { LoginInput } from "../../dtos/auth/login_dtos";
export declare const LoginDAO: (userData: LoginInput) => Promise<{
    id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    location: import("@prisma/client").$Enums.Location;
    username: string;
    password: string;
    isActive: boolean;
    role: import("@prisma/client").$Enums.RoleUsers;
} | null>;
//# sourceMappingURL=dao.d.ts.map
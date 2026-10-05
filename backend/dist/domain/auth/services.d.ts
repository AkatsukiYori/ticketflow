import { LoginInput } from "../../dtos/auth/login_dtos";
export declare const LoginServices: (userData: LoginInput) => Promise<{
    status: string;
    message: string;
    token?: never;
    username?: never;
    location?: never;
    role?: never;
} | {
    status: string;
    message: string;
    token: string;
    username: string;
    location: import("@prisma/client").$Enums.Location;
    role: import("@prisma/client").$Enums.RoleUsers;
}>;
//# sourceMappingURL=services.d.ts.map
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
    username: any;
    location: any;
    role: any;
}>;
//# sourceMappingURL=services.d.ts.map
import * as DTO from "../../dtos/users/users_dto";
export declare const GetUserByUsernameDAO: (username: string) => Promise<{
    id: number;
    username: string;
    role: import("@prisma/client").$Enums.RoleUsers;
} | null>;
export declare const GetAllUsersDAO: () => Promise<{
    id: number;
    username: string;
    role: import("@prisma/client").$Enums.RoleUsers;
}[]>;
export declare const CreateUsersDAO: (data: DTO.CreateUserInput) => Promise<void>;
export declare const UpdateUsersDAO: (data: Partial<DTO.UpdateUserInput>, id: number) => Promise<void>;
export declare const DeleteUsersDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
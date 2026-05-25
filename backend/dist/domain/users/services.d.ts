import * as DTO from "../../dtos/users/users_dto";
export declare const GetUserByUsernameServices: (username: string) => Promise<any>;
export declare const GetAllUsersServices: () => Promise<any>;
export declare const CreateUsersServices: (data: DTO.CreateUserInput) => Promise<{
    message: string;
}>;
export declare const UpdateUsersServices: (id: number, data: DTO.UpdateUserInput) => Promise<{
    message: string;
}>;
export declare const DeleteUsersServices: (id: number) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
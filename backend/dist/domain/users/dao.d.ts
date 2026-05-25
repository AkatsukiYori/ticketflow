import * as DTO from "../../dtos/users/users_dto";
export declare const GetUserByUsernameDAO: (username: string) => Promise<any>;
export declare const GetAllUsersDAO: () => Promise<any>;
export declare const CreateUsersDAO: (data: DTO.CreateUserInput) => Promise<void>;
export declare const UpdateUsersDAO: (data: Partial<DTO.UpdateUserInput>, id: number) => Promise<void>;
export declare const DeleteUsersDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
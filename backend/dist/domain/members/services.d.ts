import * as MembersDTO from "../../dtos/members/members_dto";
export declare const GetAllMembersServices: () => Promise<{
    id: number;
    username: string;
    active_status: boolean;
}[]>;
export declare const CreateMembersServices: (data: MembersDTO.CreateMembersInput) => Promise<{
    message: string;
}>;
export declare const UpdateMembersServices: (data: MembersDTO.UpdateMembersInput, id: number) => Promise<{
    message: string;
}>;
export declare const DeleteMembersServices: (id: number) => Promise<{
    message: string;
}>;
//# sourceMappingURL=services.d.ts.map
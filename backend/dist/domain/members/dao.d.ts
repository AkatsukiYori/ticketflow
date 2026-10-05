import * as MembersDTO from "../../dtos/members/members_dto";
export declare const GetAllMembersDAO: () => Promise<{
    id: number;
    username: string;
    active_status: boolean;
}[]>;
export declare const CreateMembersDAO: (data: MembersDTO.CreateMembersInput) => Promise<void>;
export declare const UpdateMembersDAO: (data: Partial<MembersDTO.UpdateMembersInput>, id: number) => Promise<void>;
export declare const DeleteMembersDAO: (id: number) => Promise<void>;
//# sourceMappingURL=dao.d.ts.map
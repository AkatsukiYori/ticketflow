import { Location } from "@prisma/client";

export interface CreateUsersBody {
    username: string;
    password: string;
    location: Location;
    isActive: boolean;
}

export interface UpdateUsersBody {
    username?: string;
    password?: string;
    location?: Location;
    isActive?: boolean;
}
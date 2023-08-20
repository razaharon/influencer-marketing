import { IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, Min } from "class-validator";
import { UserPlatform } from "../enums/user-platform.enum";
import { UserSearchType } from "../enums/user-search-type.enum";

export default class GetUsersDTO {
    @IsNotEmpty()
    @IsString()
    q: string;

    @IsNotEmpty()
    @IsNumberString()
    limit: number;

    @IsNotEmpty()
    @IsEnum(UserSearchType)
    type: UserSearchType = UserSearchType.SEARCH;
    
    @IsEnum(UserPlatform)
    platform?: UserPlatform = UserPlatform.INSTAGRAM 
}
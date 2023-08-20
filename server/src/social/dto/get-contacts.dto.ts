import { UserPlatform } from "../enums/user-platform.enum";
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export default class getContactsDTO {
    
    @IsNotEmpty()
    @IsString()
    url: string;
    
    @IsEnum(UserPlatform)
    platform?: UserPlatform = UserPlatform.INSTAGRAM 
}
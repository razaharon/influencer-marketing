import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class GetFeedDTO {
    
    @IsNotEmpty()
    @IsString()
    url: string;
    
    @IsString()
    @IsOptional()
    after?: string;
}
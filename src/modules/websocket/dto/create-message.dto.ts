import { IsString, IsOptional } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    content: string;

    @IsOptional()
    readonly type?: string;
}

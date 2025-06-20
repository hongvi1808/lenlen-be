import { PartialType } from '@nestjs/swagger';
import { LoginDto } from './login.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RegisterDto extends PartialType(LoginDto) {
    @IsString()
    fullName: string;
    @IsNumber()
    birthDay: number
    @IsOptional()
    email?: string

}

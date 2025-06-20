import { IsString } from "class-validator";
import { PhoneNumber } from "src/configs/decorators/phone-number.decorator";

export class LoginDto {
    @PhoneNumber()
    phoneNumber: string
    @IsString()
    password : string;
}

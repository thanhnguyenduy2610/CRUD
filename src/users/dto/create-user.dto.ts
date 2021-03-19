import { IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly Uname: string;

    @IsString()
    readonly Password: string;

    @IsString()
    readonly Role: string;
}

import { IsEmail, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class userDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    apikey?: string
}
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  readonly username: string;

  @IsString()
  readonly password: string;
}

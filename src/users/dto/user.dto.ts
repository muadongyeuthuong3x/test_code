import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() login: string;
  @IsNotEmpty() password: string;
}

export class LoginUserDto {
  @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}


export class UpdateUser {
    @IsNotEmpty() passwordOld: string;
    @IsNotEmpty() passwordNew: string;
  }
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'username must be a string' })
  @MaxLength(20, { message: 'username must be lower than 20 charachters' })
  @IsDefined({ message: 'username is required' })
  username: string;

  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 charachters' })
  @IsDefined({ message: 'password is required' })
  password: string;

  @IsString({ message: 'email must be a string' })
  @IsEmail({}, { message: 'email is not valid' })
  @IsDefined({ message: 'email is required' })
  email: string;
}

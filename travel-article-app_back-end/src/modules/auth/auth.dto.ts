import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  password: string;
}

export class LoginResponseDto {
  name: string;
  access_token: string;
}

export class RegisterRequestDto {
  @ApiProperty({ example: 'email@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'john son' })
  @IsNotEmpty()
  name: string;
}

export class RegisterResponseDto {
  id: string;
  name: string;
  email: string;
}

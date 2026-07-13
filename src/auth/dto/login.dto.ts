import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  nip!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
import { IsString, IsNotEmpty, IsBoolean, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nip!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsBoolean()
  @IsOptional()
  isHrd?: boolean;
}
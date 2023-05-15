import { IsDefined, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsDefined()
  first_name: string;

  @IsString()
  @IsDefined()
  last_name: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  job: string;

  @IsString()
  @IsOptional()
  avatar?: Express.Multer.File;
}

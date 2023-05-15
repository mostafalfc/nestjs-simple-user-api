import { IsDefined, IsString } from 'class-validator';

export class CreateUserAvatarDto {
  @IsDefined()
  @IsString()
  user_id: string;

  @IsDefined()
  @IsString()
  avatar: Express.Multer.File;
}

import { IsDefined, IsString } from 'class-validator';

export class CreateReqresUserDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  job: string;
}

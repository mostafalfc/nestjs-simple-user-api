import { IsDefined, IsNumber } from 'class-validator';

export class FindUserDto {
  @IsNumber()
  @IsDefined()
  reqres_id: string;
}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreateReqresUserDto } from '../dto/create-reqres-user.dto';

@Injectable()
export class ReqresService {
  constructor(private readonly httpService: HttpService) {}
  private readonly base_url = 'https://reqres.in';

  async create(input: CreateReqresUserDto): Promise<number> {
    const result = await this.httpService.axiosRef.post(
      `${this.base_url}/api/users`,
      JSON.stringify(input),
    );
    if (result.status === 201) return Number(result.data['id']);
    else return 0;
  }
}

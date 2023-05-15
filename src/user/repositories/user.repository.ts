import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(input: CreateUserDto): Promise<User> {
    return await this.userModel.create(input);
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).lean();
  }

  async findOneByReqresId(id: number): Promise<User> {
    return this.userModel.findOne({ reqres_id: id }).lean();
  }
}

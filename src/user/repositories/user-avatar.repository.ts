import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserAvatar } from '../schemas/user-avatar.schema';
import { Model } from 'mongoose';
import { CreateUserAvatarDto } from '../dto/create-user-avatar.dto';

@Injectable()
export class UserAvatarRepository {
  constructor(
    @InjectModel(UserAvatar.name)
    private readonly userAvatarModel: Model<UserAvatar>,
  ) {}

  async create(input: Partial<UserAvatar>): Promise<UserAvatar> {
    return await this.userAvatarModel.create(input);
  }

  async getUserAvatar(userId: string): Promise<UserAvatar> {
    return this.userAvatarModel.findOne({ user_id: userId });
  }

  async deleteUserAvatar(userId: string): Promise<boolean> {
    const result = await this.userAvatarModel.deleteOne({ user_id: userId });
    console.log(result);
    return result.deletedCount === 1;
  }
}

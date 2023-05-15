import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAvatarDto } from '../dto/create-user-avatar.dto';
import { UserAvatar } from '../schemas/user-avatar.schema';
import { UserAvatarRepository } from '../repositories/user-avatar.repository';
import { AvatarFileInterface } from '../../helpers/avatar-file.interface';

@Injectable()
export class UserAvatarService {
  constructor(private readonly userAvatarRepository: UserAvatarRepository) {}
  async create(input: CreateUserAvatarDto): Promise<UserAvatar> {
    return await this.userAvatarRepository.create({
      user_id: input.user_id,
      avatar: Buffer.from(JSON.stringify(input.avatar)).toString('base64'),
    });
  }

  async findUserAvatar(id: string): Promise<string> {
    const user_avatar = await this.userAvatarRepository.getUserAvatar(id);
    if (!user_avatar) throw new NotFoundException('User avatar not found');
    const buffer = Buffer.from(user_avatar.avatar, 'base64');
    const avatar_file: AvatarFileInterface = JSON.parse(buffer.toString());
    return avatar_file.path;
  }

  async deleteUserAvatar(id: string): Promise<boolean> {
    return await this.userAvatarRepository.deleteUserAvatar(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { ReqresService } from './reqres.service';
import { UserSerializer } from '../serializer/user.serializer';
import { toClass } from '../../helpers/utilities';
import { UserAvatarService } from './user-avatar.service';
import { NotificationService } from '../../notification/notification.service';
import { UserNotificationService } from './user-notification.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly reqresService: ReqresService,
    private readonly userAvatarService: UserAvatarService,
    private readonly userNotificationService: UserNotificationService,
  ) {}
  async createUser(input: CreateUserDto): Promise<UserSerializer> {
    const user = await this.userRepository.create(input);
    let avatar = '';
    if (input.avatar) {
      const user_avatar = await this.userAvatarService.create({
        avatar: input.avatar,
        user_id: user._id,
      });
      if (user_avatar) avatar = input.avatar.path;
    }
    const resres_id = await this.reqresService.create({
      name: input.first_name,
      job: input.job,
    });
    if (resres_id > 0) {
      user.reqres_id = resres_id;
      await user.save();
    }
    this.userNotificationService.sendRegisterEmail(input.email);
    return toClass(UserSerializer, { ...user.toObject(), avatar });
  }

  async findUser(id: string): Promise<User> {
    const user = isNaN(Number(id))
      ? await this.userRepository.findOne(id)
      : await this.userRepository.findOneByReqresId(Number(id));

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findUserAvatar(id: string): Promise<string> {
    const user = await this.findUser(id);
    return await this.userAvatarService.findUserAvatar(user._id);
  }

  async deleteUserAvatar(id: string): Promise<string> {
    const user = await this.findUser(id);
    const path = await this.findUserAvatar(id);
    await this.userAvatarService.deleteUserAvatar(user._id);
    return path;
  }
}

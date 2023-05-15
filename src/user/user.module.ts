import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './user.controller';
import { ReqresService } from './services/reqres.service';
import { HttpModule } from '@nestjs/axios';
import { UserAvatarRepository } from './repositories/user-avatar.repository';
import { UserAvatar, UserAvatarSchema } from './schemas/user-avatar.schema';
import { UserAvatarService } from './services/user-avatar.service';
import { NotificationModule } from '../notification/notification.module';
import { UserNotificationService } from './services/user-notification.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserAvatar.name, schema: UserAvatarSchema },
    ]),
    HttpModule,
    NotificationModule,
  ],
  providers: [
    UserService,
    UserRepository,
    ReqresService,
    UserAvatarRepository,
    UserAvatarService,
    NotificationModule,
    UserNotificationService,
  ],
  controllers: [UserController],
})
export class UserModule {}

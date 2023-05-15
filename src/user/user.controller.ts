import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './services/user.service';
import { UserSerializer } from './serializer/user.serializer';
import { toClass } from '../helpers/utilities';
import { FindUserDto } from './dto/find-user.dto';
import { extname, join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.avatar = file;
    const result = await this.userService.createUser(body);
    return { result };
  }

  @Get(':reqres_id')
  async getUser(@Param() { reqres_id }: FindUserDto) {
    const user = await this.userService.findUser(reqres_id);
    const result = toClass(UserSerializer, user);
    return { result };
  }

  @Get(':reqres_id/avatar')
  async getUserAvatar(@Param() { reqres_id }: FindUserDto) {
    const result = await this.userService.findUserAvatar(reqres_id);
    return { result };
  }

  @Delete(':reqres_id/avatar')
  async removeFile(@Param() { reqres_id }: FindUserDto) {
    const path = await this.userService.deleteUserAvatar(reqres_id);
    fs.unlinkSync(join(process.cwd(), path));
    return { result: 'Done' };
  }
}

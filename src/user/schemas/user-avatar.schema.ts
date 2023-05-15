import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserAvatar extends Document {
  _id: string;

  @Prop({ type: String, required: true, ref: 'users' })
  user_id: string;

  @Prop({ type: String, required: true })
  avatar: string;
}

export const UserAvatarSchema = SchemaFactory.createForClass(UserAvatar);

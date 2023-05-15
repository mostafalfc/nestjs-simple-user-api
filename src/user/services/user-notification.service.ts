import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../notification/notification.service';

@Injectable()
export class UserNotificationService {
  constructor(private readonly notificationService: NotificationService) {}

  async sendRegisterEmail(email: string) {
    await this.notificationService.sendEmail(email, 'Welcome');
  }
}

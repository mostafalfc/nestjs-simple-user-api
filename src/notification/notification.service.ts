import { Injectable } from '@nestjs/common';
import { Client, ClientRMQ } from '@nestjs/microservices';
import { NotificationRmqOptions } from './notification-rmq.options';

@Injectable()
export class NotificationService {
  /*
  This Class provide email by rmq
   */
  @Client(NotificationRmqOptions)
  private readonly emailClient: ClientRMQ;

  async sendEmail(email: string, message: string) {
    try {
      this.emailClient.emit('send-email', {
        email,
        message,
      });
      console.log(`email sent to ${email}`);
    } catch (e) {
      console.log(e);
    }
  }
}

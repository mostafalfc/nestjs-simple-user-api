import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const {
      message,
      status = HttpStatus.INTERNAL_SERVER_ERROR,
      stack,
    }: any = exception;

    response.status(status).json({
      statusCode: status,
      message,
      data: stack,
    });
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: HttpStatus, code?: string) {
    super(
      {
        success: false,
        code: code || 'ERROR',
        message,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}

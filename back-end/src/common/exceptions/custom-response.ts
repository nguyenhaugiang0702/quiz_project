import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomResponse {
  /**
   * Success Response
   * @param message Mô tả kết quả
   * @param data Dữ liệu trả về
   * @param code Mã code tùy chỉnh
   */
  static success(message: string, data?: any, code?: string) {
    return {
      success: true,
      code: code || 'SUCCESS',
      message,
      data: data || null,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Error Response
   * @param message Mô tả lỗi
   * @param status HttpStatus (400, 404, 500, ...)
   * @param code Mã lỗi tùy chỉnh
   */
  static error(message: string, status: HttpStatus, code?: string) {
    return {
      success: false,
      code: code || 'ERROR',
      message,
      status,
      timestamp: new Date().toISOString(),
    };
  }
}

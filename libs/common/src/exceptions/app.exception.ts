import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class AppException extends RpcException {
  constructor(message: object | string, statusCode: HttpStatus) {
    super({ message, statusCode });
  }
}

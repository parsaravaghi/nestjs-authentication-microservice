import { AppException } from '@app/common/exceptions';
import { HttpStatus } from '@nestjs/common';

export class UserDuplicateException extends AppException {
  constructor() {
    super('user already exists', HttpStatus.CONFLICT);
  }
}

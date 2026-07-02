import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';

export class UnknownDbError extends AppException {
  constructor() {
    super('Unknown db error', HttpStatus.CONFLICT);
  }
}

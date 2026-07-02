import {
  InternalServerException,
  UnknownDbError,
} from '@app/common/exceptions';
import { User } from '@app/database/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserDuplicateException } from './exceptions/user-duplicate.exception';
import bcrypt from 'bcrypt';
import { RegisterDto } from '@app/constracts';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(registerDto: RegisterDto) {
    const newUser = this.userRepository.create({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, 12),
    });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error): never {
    // Any other recognized query failure — generic 500
    if (!(error instanceof QueryFailedError))
      throw new InternalServerException();

    const dbError = error as QueryFailedError & {
      code?: string;
    };

    // '23505' = Postgres unique_violation (duplicate key)
    if (dbError.code === '23505') throw new UserDuplicateException();

    // Not a query failure we recognize (e.g. connection error) — treat as unknown
    throw new UnknownDbError();
  }
}

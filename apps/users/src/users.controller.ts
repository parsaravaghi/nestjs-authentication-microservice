import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterDto } from '@app/constracts';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('user.create')
  createUser(registerDto: RegisterDto) {
    return this.usersService.createUser(registerDto);
  }
}

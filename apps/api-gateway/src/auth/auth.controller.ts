import { RegisterDto } from '@app/constracts';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private clientProxy: ClientProxy) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.clientProxy.send('auth.create', registerDto);
  }
}

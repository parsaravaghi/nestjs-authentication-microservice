import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createRmqOption } from '@app/constracts';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.createAsync([
      {
        name: 'AUTH_SERVICE',
        inject: [ConfigService],
        useFactory: createRmqOption('auth_queue'),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [],
})
export class ApiGatewayModule {}

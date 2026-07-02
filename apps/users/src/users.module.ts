import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '@app/database/entities/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', './apps/users/.env'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('APP_DB_HOST'),
          port: configService.get<number>('APP_DB_PORT'),
          username: configService.get<string>('APP_DB_USER'),
          password: configService.get<string>('APP_DB_PASSWORD'),
          entities: [User],
          database: configService.get<string>('APP_DB_NAME'),
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

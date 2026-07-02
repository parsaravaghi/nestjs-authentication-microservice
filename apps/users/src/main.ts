import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.APP_MB_USER}:${process.env.APP_MB_PASSWORD}@${process.env.APP_MB_HOST}:${process.env.APP_MB_PORT}`,
        ],
        queue: 'auth_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();

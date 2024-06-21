import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { SenderModule } from 'mail-sender.module';
import { SERVER_PORT } from 'utils/env';

async function bootstrap() {
  const app = await NestFactory.create(SenderModule);
  app.listen(SERVER_PORT).then(() => {
    console.log('Listen event...');
  });
}

bootstrap();

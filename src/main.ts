import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { UnauthorizedExceptionFilter } from './auth/unauthorized.exception';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();

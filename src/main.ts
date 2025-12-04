/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new PrismaExceptionFilter());

  // Serve static files with explicit CORS headers for images
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
    setHeaders: (res) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5174'); // or '*'
      res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin,Content-Type,Accept',
      );
    },
  });

  // General CORS for API routes
  app.enableCors({
    origin: [
      'http://localhost:5174',
      'https://scabbily-watery-cindie.ngrok-free.dev',
      'https://fervidly-unshort-stanton.ngrok-free.dev',
    ],
    credentials: true,
  });

  await app.listen(3001);
}

void bootstrap();

import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const DEFAULT_NODE_PORT = 3300;
const NODE_PORT = process.env.NODE_PORT
  ? parseInt(process.env.NODE_PORT)
  : DEFAULT_NODE_PORT;
const NODE_ENV = process.env.NODE_ENV || 'development';

export async function bootstrap(port: number): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(
    `[${NODE_ENV.toUpperCase()}] Todo-API listening on port: ${port}`
  );
}

bootstrap(NODE_PORT);

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyInstance } from 'fastify';
import { setUpSwagger } from './setupSwagger';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const adapter = new FastifyAdapter({ logger: true });
  const server = adapter.getInstance<FastifyInstance>();
  console.log(server);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    { logger: ['log', 'error', 'warn', 'debug', 'verbose'], rawBody: true },
  );
  setUpSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();

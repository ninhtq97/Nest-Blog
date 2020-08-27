import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const logger = new Logger();

  initSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT);

  logger.log(`Server is runngin on ${await app.getUrl()}`);
}
bootstrap();

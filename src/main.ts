import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { winstonOptions } from './common/winston-options';
import { CbrExchangeModule } from './cbr-exchange/cbr-exchange.module';
import { CbrExchangeService } from './cbr-exchange/cbr-exchange.service';
import { AppModule } from './app.module';

async function bootstrap() {
  // Создание и внедрение стороннего логгера
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonOptions),
  });

  // Получить данные при запуске приложения
  await app
    .select(CbrExchangeModule)
    .get(CbrExchangeService)
    .initExchangeData();
  await app.listen(3000);
}

bootstrap();

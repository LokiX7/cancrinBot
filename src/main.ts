import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CbrExchangeModule } from './cbr-exchange/cbr-exchange.module';
import { CbrExchangeService } from './cbr-exchange/cbr-exchange.service';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const winstonOptions = {
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.File({
        filename: 'error.log',
        dirname: 'logs',
        level: 'error',
        format: winston.format.json(),
      }),
      new winston.transports.File({
        filename: 'info.log',
        dirname: 'logs',
        level: 'info',
        format: winston.format.json(),
      }),
      new winston.transports.File({
        filename: 'combined.log',
        dirname: 'logs',
        level: 'debug',
        format: winston.format.json(),
      }),
    ],
  };

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonOptions),
  });

  await app
    .select(CbrExchangeModule)
    .get(CbrExchangeService)
    .initExchangeData();
  await app.listen(3000);
}

bootstrap();

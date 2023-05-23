import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CbrExchangeModule } from './cbr-exchange/cbr-exchange.module';
import { CbrExchangeService } from './cbr-exchange/cbr-exchange.service';
import { CbrExchangeDto } from './cbr-exchange/dto/valute.dto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .select(CbrExchangeModule)
    .get(CbrExchangeService)
    .initValutesExchange();
  await app.listen(3000);
}
bootstrap();

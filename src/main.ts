import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CbrExchangeModule } from './cbr-exchange/cbr-exchange.module';
import { CbrExchangeService } from './cbr-exchange/cbr-exchange.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .select(CbrExchangeModule)
    .get(CbrExchangeService)
    .initExchangeData();
  await app.listen(3000);
}
bootstrap();

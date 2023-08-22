import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { CbrExchangeModule } from 'src/cbr-exchange/cbr-exchange.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { BotConfigService } from './bot.config-service';
import { BotButtons } from './bot.buttons';
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useClass: BotConfigService,
    }),
    CbrExchangeModule,
  ],
  providers: [BotService, BotUpdate, BotButtons],
})
export class BotModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token: configService.get<string>('BOT_TOKEN'),
      }),
    }),
  ],
  providers: [BotService, BotUpdate],
})
export class BotModule {}

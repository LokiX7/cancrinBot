import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions, TelegrafOptionsFactory } from 'nestjs-telegraf';

// Конфигурация бота, она передаётся в TelegrafModule
@Injectable()
export class BotConfigService implements TelegrafOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTelegrafOptions(): TelegrafModuleOptions {
    return {
      token: this.configService.get<string>('BOT_TOKEN'),
      botName: this.configService.get<string>('BOT_NAME'),
    };
  }
}

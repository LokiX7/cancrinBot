import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';

@Injectable()
export class BotButtons {
  startKeyboard() {
    return Markup.inlineKeyboard(
      [
        Markup.button.callback('Доступные валюты', 'availableValutes'),
        Markup.button.callback('Курс валюты', 'valuteExchange'),
        Markup.button.callback('Конвертировать валюту', 'convertValutes'),
      ],
      {
        columns: 3,
      },
    );
  }

  valutes() {
    return undefined;
  }
}

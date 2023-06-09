import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';

@Injectable()
export class BotButtons {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}
  startKeyboard() {
    return Markup.inlineKeyboard([
      Markup.button.callback('Доступные валюты', 'availableValutes'),
    ]);
  }

  valutesKeyboard() {
    const buttons: InlineKeyboardButton.CallbackButton[] = [];

    for (const charCode in this.cbrExchangeService.exchangeData.valute) {
      buttons.push(
        Markup.button.callback(`${charCode}`, `getValuteExchange_${charCode}`),
      );
    }

    buttons.sort();

    return Markup.inlineKeyboard(buttons, { columns: 4 });
  }
}

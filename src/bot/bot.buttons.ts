import { Injectable } from '@nestjs/common';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotButtons {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}
  startKeyboard() {
    return Markup.inlineKeyboard([
      Markup.button.callback('Доступные валюты', 'availableValutes'),
    ]);
  }

  valutesKeyboard(opts: { getExchangeOnly?: boolean }) {
    const buttons: InlineKeyboardButton.CallbackButton[] = [];
    const actionType: 'getValuteExchange' | 'getValute' = opts.getExchangeOnly
      ? 'getValuteExchange'
      : 'getValute';

    for (const charCode in this.cbrExchangeService.exchangeData.valute) {
      buttons.push(
        Markup.button.callback(`${charCode}`, `${actionType}_${charCode}`),
      );
    }

    buttons.sort();

    return Markup.inlineKeyboard(buttons, { columns: 4 });
  }
}

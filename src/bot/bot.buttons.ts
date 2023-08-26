import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { InlineKeyboardButton } from 'telegraf/typings/core/types/typegram';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';

// Класс формирующий кнопки для клиента
@Injectable()
export class BotButtons {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}
  // Формирует кнопку котрая вызывает Action availableCurrencies который по итогу выводит кнопки currenciesKeyboard
  startKeyboard() {
    return Markup.inlineKeyboard([
      Markup.button.callback('Доступные валюты', 'availableCurrencies'),
    ]);
  }

  // Формирует набор кнопок. Каждая кнопка это буквенный код валюты
  // Каждая кнопка вызывает Action getCurrencyExchange_[код валюты]
  currenciesKeyboard() {
    const buttons: InlineKeyboardButton.CallbackButton[] = [];

    for (const charCode in this.cbrExchangeService.exchangeData.currency) {
      buttons.push(
        Markup.button.callback(
          `${charCode}`,
          `getCurrencyExchange_${charCode}`,
        ),
      );
    }

    buttons.sort();

    return Markup.inlineKeyboard(buttons, { columns: 4 });
  }
}

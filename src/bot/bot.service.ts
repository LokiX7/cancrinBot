import { Injectable } from '@nestjs/common';
import { charCodeValidation } from './validators/char-code.validator';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';

@Injectable()
export class BotService {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}

  async createValuteList(): Promise<string> {
    const valutes = await this.cbrExchangeService.getAllValutes();

    let count = 0;
    let message = '';

    for (const valute of valutes) {
      count++;
      message = message.concat(
        `${count}. ${valute.charCode} - ${valute.name}\n`,
      );
    }

    return message;
  }
  async getValute(charCode: string): Promise<string> {
    charCodeValidation(charCode, this.cbrExchangeService.exchangeData);

    const valuteData = await this.cbrExchangeService.getValuteByCharCode(
      charCode,
    );

    return (
      `${valuteData.name}` +
      `\n- <b>Буквенный код</b>: ${valuteData.charCode}` +
      `\n- <b>Цифровой код</b>: ${valuteData.numCode}` +
      `\n- <b>Номинал</b>: ${valuteData.nominal}` +
      `\n- <b>Обменный курс</b>: ${valuteData.value}`
    );
  }
  // eslint-disable-next-line prettier/prettier
  async getValuteExchange(charCode: string | undefined): Promise<string> {
    charCodeValidation(charCode, this.cbrExchangeService.exchangeData);

    const valuteData = await this.cbrExchangeService.getValuteByCharCode(
      charCode,
    );

    return `${valuteData.name} - ${valuteData.value.toFixed(2)} руб`;
  }

  getLastUpdateDate(): ExchangeDataI['date'] {
    return this.cbrExchangeService.exchangeData.date;
  }
}

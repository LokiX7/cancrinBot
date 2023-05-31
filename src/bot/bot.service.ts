import { Injectable } from '@nestjs/common';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { charCodeValidation } from './validators/char-code.validator';

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

  getLastUpdateDate(): {
    day: number;
    month: number;
    year: number;
  } {
    const date = new Date(this.cbrExchangeService.exchangeData.date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }
}

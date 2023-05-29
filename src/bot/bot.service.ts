import { Injectable } from '@nestjs/common';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';

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
    const valuteData = await this.cbrExchangeService.getValuteByCharCode(
      charCode,
    );
    return `${valuteData.name}\n${valuteData.charCode}\n${valuteData.nominal}\n${valuteData.value}`;
  }
  // eslint-disable-next-line prettier/prettier
  async getValuteExchange(charCode: string | undefined): Promise<string> {
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

import { Injectable } from '@nestjs/common';
import { charCodeValidation } from './validators/char-code.validator';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { CurrencyI } from '../common/interfaces/currency.interface';

@Injectable()
export class BotService {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}

  // Возвращает все достпуные валюты ввиде списка
  async getCurrencies(): Promise<CurrencyI[]> {
    return this.cbrExchangeService.getAllCurrencies();
  }

  // Возвращает одну валюту по её 3х буквенному коду
  async getCurrency(charCode: string): Promise<CurrencyI> {
    charCodeValidation(charCode, this.cbrExchangeService.exchangeData);

    return this.cbrExchangeService.getCurrencyByCharCode(charCode);
  }

  // Возвращает последнию дату обновления данных
  getLastUpdateDate(): ExchangeDataI['date'] {
    return this.cbrExchangeService.exchangeData.date;
  }
}

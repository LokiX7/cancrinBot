import { Injectable } from '@nestjs/common';
import { charCodeValidation } from './validators/char-code.validator';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { CurrencyI } from '../common/interfaces/currency.interface';

@Injectable()
export class BotService {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}

  async getCurrencies(): Promise<CurrencyI[]> {
    return this.cbrExchangeService.getAllCurrencies();
  }

  async getCurrency(charCode: string): Promise<CurrencyI> {
    charCodeValidation(charCode, this.cbrExchangeService.exchangeData);

    return this.cbrExchangeService.getCurrencyByCharCode(charCode);
  }

  getLastUpdateDate(): ExchangeDataI['date'] {
    return this.cbrExchangeService.exchangeData.date;
  }
}

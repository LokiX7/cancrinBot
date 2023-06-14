import { Injectable } from '@nestjs/common';
import { charCodeValidation } from './validators/char-code.validator';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ValuteI } from '../common/interfaces/valute.interface';

@Injectable()
export class BotService {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}

  async getValutes(): Promise<ValuteI[]> {
    return this.cbrExchangeService.getAllValutes();
  }

  async getValute(charCode: string): Promise<ValuteI> {
    charCodeValidation(charCode, this.cbrExchangeService.exchangeData);

    return this.cbrExchangeService.getValuteByCharCode(charCode);
  }

  getLastUpdateDate(): ExchangeDataI['date'] {
    return this.cbrExchangeService.exchangeData.date;
  }
}

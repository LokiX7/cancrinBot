import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { CurrencyEntity } from 'src/common/entities/currency.entity';
import { CurrencyI } from 'src/common/interfaces/currency.interface';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';
import { CbrExchangeApi } from './cbr-exchange.api';

@Injectable()
export class CbrExchangeService {
  public exchangeData: undefined | ExchangeDataI;

  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currenciesRepository: Repository<CurrencyEntity>,
    private readonly apiReq: CbrExchangeApi,
  ) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM, { timeZone: 'Europe/Moscow' })
  async initExchangeData(): Promise<(CurrencyI & CurrencyEntity)[]> {
    const response = await this.apiReq.request();

    this.exchangeData = ExchangeDataFormatter.format(response.data);

    const currenciesArr: CurrencyI[] = [];

    for (const currencyCharCode in this.exchangeData.currency) {
      currenciesArr.push(this.exchangeData.currency[currencyCharCode]);
    }
    return this.currenciesRepository.save(currenciesArr);
  }

  async getCurrencyByCharCode(charCode: string): Promise<CurrencyI> {
    return this.currenciesRepository.findOneBy({ charCode: charCode });
  }

  async getAllCurrencies(): Promise<CurrencyI[]> {
    return this.currenciesRepository.find({});
  }
}

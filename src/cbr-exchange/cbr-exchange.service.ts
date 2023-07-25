import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { ValuteEntity } from 'src/common/entities/valute.entity';
import { ValuteI } from 'src/common/interfaces/valute.interface';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';
import { CbrExchangeApi } from './cbr-exchange.api';

@Injectable()
export class CbrExchangeService {
  public exchangeData: undefined | ExchangeDataI;

  constructor(
    @InjectRepository(ValuteEntity)
    private readonly valutesRepository: Repository<ValuteEntity>,
    private readonly apiReq: CbrExchangeApi,
  ) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM, { timeZone: 'Europe/Moscow' })
  async initExchangeData(): Promise<(ValuteI & ValuteEntity)[]> {
    const response = await this.apiReq.request();

    this.exchangeData = ExchangeDataFormatter.format(response.data);

    const valutesArr: ValuteI[] = [];

    for (const valuteCharCode in this.exchangeData.valute) {
      valutesArr.push(this.exchangeData.valute[valuteCharCode]);
    }
    return this.valutesRepository.save(valutesArr);
  }

  async getValuteByCharCode(charCode: string): Promise<ValuteI> {
    return this.valutesRepository.findOneBy({ charCode: charCode });
  }

  async getAllValutes(): Promise<ValuteI[]> {
    return this.valutesRepository.find({});
  }
}

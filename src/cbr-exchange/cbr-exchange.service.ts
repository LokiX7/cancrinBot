import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ValuteEntity } from 'src/common/entity/valute.entity';
import { ValuteI } from '../common/interfaces/valute.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeUtills } from './cbr.exchange.utills';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CbrExchangeService {
  public exchangeData: undefined | ExchangeDataI;
  constructor(
    @InjectRepository(ValuteEntity)
    private readonly valutesRepository: Repository<ValuteEntity>,
    private readonly apiReq: CbrExchangeApi,
    private readonly utills: CbrExchangeUtills,
  ) {}

  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM, { timeZone: 'Europe/Moscow' })
  async initExchangeData(): Promise<(ValuteI & ValuteEntity)[]> {
    const response = await this.apiReq.request();
    this.exchangeData = this.utills.formatter(response.data);
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

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ValuteEntity } from 'src/entity/valute.entity';
import { ValuteI } from './interfaces/valute.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ExchangeDataI } from './interfaces/exchangeData.interface';
import { CbrExchangeApiReq } from './cbr-exchange.api';
import { CbrExchangeUtills } from './cbr.exchange.utills';

@Injectable()
export class CbrExchangeService {
  public exchangeData: undefined | ExchangeDataI;
  constructor(
    @InjectRepository(ValuteEntity)
    private readonly valutesRepository: Repository<ValuteEntity>,
    private readonly apiReq: CbrExchangeApiReq,
    private readonly utills: CbrExchangeUtills,
  ) {}

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
    if (this.isCharCode(charCode)) {
      return this.valutesRepository.findOneBy({ charCode: charCode });
    }
    throw new Error('Not a charCode');
  }

  async getAllValutes(): Promise<ValuteI[]> {
    return this.valutesRepository.find({});
  }

  private isCharCode(charCode: string): boolean {
    if (this.exchangeData.valute[charCode]) {
      return true;
    }
    return false;
  }
}

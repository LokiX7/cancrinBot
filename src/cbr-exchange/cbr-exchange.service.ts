import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { CbrExchangeDto } from './dto/valute.dto';
import { Repository } from 'typeorm';
import { ValuteEntity } from 'src/entity/valute.entity';
import { ValuteI } from './interfaces/valute.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CbrExchangeService {
  constructor(
    @InjectRepository(ValuteEntity)
    private readonly valutesRepository: Repository<ValuteEntity>,
    private readonly httpService: HttpService,
  ) {}

  private readonly URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
  async initValutesExchange(): Promise<(ValuteI & ValuteEntity)[]> {
    const response = await this.request();
    const valutes = await this.formatter(response.data);
    return this.valutesRepository.save(valutes);
  }

  async getValute(numCode: number): Promise<ValuteI> {
    return this.valutesRepository.findOneBy({ numCode: numCode });
  }

  async getAllValutes(): Promise<ValuteI[]> {
    return this.valutesRepository.find({});
  }

  private async request(): Promise<AxiosResponse<CbrExchangeDto>> {
    return await firstValueFrom(this.httpService.get<CbrExchangeDto>(this.URL));
  }

  private async formatter(exchangeData: CbrExchangeDto): Promise<ValuteI[]> {
    const rawValutesData = exchangeData.Valute;
    const valutes: ValuteI[] = [];
    for (const valute in rawValutesData) {
      const rawValute = rawValutesData[valute];
      const formatedValute: ValuteI = {
        numCode: parseInt(rawValute.NumCode, 10),
        charCode: rawValute.CharCode,
        nominal: rawValute.Nominal,
        name: rawValute.Name,
        value: rawValute.Value,
        previous: rawValute.Previous,
      };
      valutes.push(formatedValute);
    }
    return valutes;
  }
}

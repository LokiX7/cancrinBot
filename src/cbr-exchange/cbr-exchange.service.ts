import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { exchangeDto } from './cbr-exchange.dto';

@Injectable()
export class CbrExchangeService {
  constructor(private readonly httpService: HttpService) {}

  private readonly URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
  async getExchange(): Promise<exchangeDto> {
    const response = await this.request();
    return response.data;
  }

  private async request(): Promise<AxiosResponse> {
    return await firstValueFrom(this.httpService.get(this.URL));
  }
}

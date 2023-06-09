import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RawExchangeDataDto } from './dto/raw-exchange-data.dto';

const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

@Injectable()
export class CbrExchangeApi {
  private readonly URL: string;
  private logger = new Logger(CbrExchangeApi.name);
  constructor(private readonly httpService: HttpService) {
    this.URL = URL;
  }

  public async request(): Promise<AxiosResponse<RawExchangeDataDto>> {
    this.logger.log(`Request - ${URL}`);
    return await firstValueFrom(
      this.httpService.get<RawExchangeDataDto>(this.URL),
    ).finally(() => this.logger.log('Request success'));
  }
}

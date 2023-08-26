import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RawCurrencyDataDto } from './dto/raw-currency-data.dto';

const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

// Класс для обращения к API cbr-xml-daily
@Injectable()
export class ParserApi {
  private logger = new Logger(ParserApi.name);

  constructor(private readonly httpService: HttpService) {}

  // Запрос сырых данных и логирование статуса запроса
  public async request(): Promise<AxiosResponse<RawCurrencyDataDto>> {
    this.logger.log(`Request - ${URL}`);

    return await firstValueFrom(
      this.httpService.get<RawCurrencyDataDto>(URL),
    ).finally(() => this.logger.log('Request success'));
  }
}

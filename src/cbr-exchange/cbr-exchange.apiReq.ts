import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RawExchangeDataDto } from './dto/rawExchangeData.dto';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';

@Injectable()
export class CbrExchangeApiReq {
  private readonly URL: string;
  constructor(private readonly httpService: HttpService) {
    this.URL = URL;
  }

  public async request(): Promise<AxiosResponse<RawExchangeDataDto>> {
    return await firstValueFrom(
      this.httpService.get<RawExchangeDataDto>(this.URL),
    );
  }
}

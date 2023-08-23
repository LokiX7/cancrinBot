import { Injectable } from '@nestjs/common';
import { ParserApi } from './parser.api';
import { ParserDataFormatter } from './parser.formatter';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';
import { ParserServiceI } from '../common/interfaces/parserService.interface';

@Injectable()
export class ParserService implements ParserServiceI {
  constructor(
    private readonly api: ParserApi,
    private readonly formatter: ParserDataFormatter,
  ) {}

  async getData(): Promise<ExchangeDataI> {
    const response = await this.api.request();
    const currencyData = this.formatter.format(response.data);

    return currencyData;
  }
}

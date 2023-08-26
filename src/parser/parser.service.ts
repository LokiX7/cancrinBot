import { Injectable } from '@nestjs/common';
import { ParserApi } from './parser.api';
import { ParserDataFormatter } from './parser.formatter';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';
import { ParserServiceI } from '../common/interfaces/parserService.interface';

// Класс интерфейс парсера
@Injectable()
export class ParserService implements ParserServiceI {
  constructor(
    private readonly api: ParserApi,
    private readonly formatter: ParserDataFormatter,
  ) {}

  // Возвращает форматированные данные полученные от API
  async getData(): Promise<ExchangeDataI> {
    const response = await this.api.request();
    const currencyData = this.formatter.format(response.data);

    return currencyData;
  }
}

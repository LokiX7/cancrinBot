import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { ExchangeEntity } from 'src/common/entities/exchange.entity';
import { CurrencyI } from 'src/common/interfaces/currency.interface';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ParserService } from '../parser/parser.service';

// Сервис упрвления данными бд
@Injectable()
export class CbrExchangeService {
  // Хранит последние полученные валютные данные и время их получения
  public exchangeData: undefined | ExchangeDataI;

  constructor(
    @InjectRepository(ExchangeEntity)
    private readonly exchangeRepository: Repository<ExchangeEntity>,
    private readonly parser: ParserService,
  ) {}

  // Обновляет данные валют
  // Вызывается при каждом запуске бота и далее вызывается в заданное время
  @Cron(CronExpression.MONDAY_TO_FRIDAY_AT_1AM, { timeZone: 'Europe/Moscow' })
  async initExchangeData(): Promise<(CurrencyI & ExchangeEntity)[]> {
    // Получает актуальные данные через парсер
    this.exchangeData = await this.parser.getData();

    const currenciesArr: CurrencyI[] = [];

    for (const currencyCharCode in this.exchangeData.currency) {
      currenciesArr.push(this.exchangeData.currency[currencyCharCode]);
    }
    return this.exchangeRepository.save(currenciesArr);
  }

  // Получает из бд данные о валюте по её charCode
  async getCurrencyByCharCode(charCode: string): Promise<CurrencyI> {
    return this.exchangeRepository.findOneBy({ charCode: charCode });
  }

  // Получает все валютные данные из бд
  async getAllCurrencies(): Promise<CurrencyI[]> {
    return this.exchangeRepository.find({});
  }
}

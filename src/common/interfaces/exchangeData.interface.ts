import { CurrencyI } from './currency.interface';

// Интерфейс валютных данных которые содержат время получения данных и сами валютные данные
export interface ExchangeDataI {
  date: {
    day: string;
    month: string;
    year: string;
  };
  currency: {
    [charCode: CurrencyI['charCode']]: CurrencyI;
  };
}

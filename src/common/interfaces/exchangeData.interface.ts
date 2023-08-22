import { CurrencyI } from './currency.interface';

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

import { ValuteI } from './valute.interface';

export interface ExchangeDataI {
  date: {
    day: string;
    month: string;
    year: string;
  };
  valute: {
    [charCode: ValuteI['charCode']]: ValuteI;
  };
}

import { ValuteI } from './valute.interface';

export interface ExchangeDataI {
  date: number;
  valute: {
    [charCode: ValuteI['charCode']]: ValuteI;
  };
}

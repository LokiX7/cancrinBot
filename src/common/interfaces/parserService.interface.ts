import { ExchangeDataI } from './exchangeData.interface';

export interface ParserServiceI {
  getData: () => Promise<ExchangeDataI>;
}

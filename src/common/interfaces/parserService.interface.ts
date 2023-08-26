import { ExchangeDataI } from './exchangeData.interface';

// Интерфейс ParserService класса который нужно имплементировать для совместимости стороннего парсера
export interface ParserServiceI {
  getData: () => Promise<ExchangeDataI>;
}

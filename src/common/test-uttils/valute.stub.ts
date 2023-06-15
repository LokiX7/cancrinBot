import { ExchangeDataI } from '../interfaces/exchangeData.interface';
import { ValuteI } from '../interfaces/valute.interface';

export class ValuteStub {
  fakeValute_AUD: ValuteI = {
    numCode: '001',
    charCode: 'AUD',
    nominal: 3,
    name: 'AUD stub',
    value: 10.1234,
    previous: 49.4321,
  };

  fakeValute_EUR: ValuteI = {
    numCode: '002',
    charCode: 'EUR',
    nominal: 2,
    name: 'EUR stub',
    value: 50.1234,
    previous: 29.4321,
  };

  fakeValute_USD: ValuteI = {
    numCode: '003',
    charCode: 'USD',
    nominal: 1,
    name: 'USD stub',
    value: 40.1234,
    previous: 79.4321,
  };

  fakeValutes: ValuteI[] = [
    this.fakeValute_AUD,
    this.fakeValute_EUR,
    this.fakeValute_USD,
  ];

  fakeExchangeData: ExchangeDataI = {
    date: {
      day: '01',
      month: '01',
      year: '2023',
    },
    valute: {
      [this.fakeValute_AUD.charCode]: this.fakeValute_AUD,
      [this.fakeValute_EUR.charCode]: this.fakeValute_EUR,
      [this.fakeValute_USD.charCode]: this.fakeValute_USD,
    },
  };
}

import { ExchangeDataI } from '../interfaces/exchangeData.interface';
import { CurrencyI } from '../interfaces/currency.interface';

export class Currenciestub {
  fakeCurrency_AUD: CurrencyI = {
    numCode: '001',
    charCode: 'AUD',
    nominal: 3,
    name: 'AUD stub',
    value: 10.1234,
    previous: 49.4321,
  };

  fakeCurrency_EUR: CurrencyI = {
    numCode: '002',
    charCode: 'EUR',
    nominal: 2,
    name: 'EUR stub',
    value: 50.1234,
    previous: 29.4321,
  };

  fakeCurrency_USD: CurrencyI = {
    numCode: '003',
    charCode: 'USD',
    nominal: 1,
    name: 'USD stub',
    value: 40.1234,
    previous: 79.4321,
  };

  fakeCurrencies: CurrencyI[] = [
    this.fakeCurrency_AUD,
    this.fakeCurrency_EUR,
    this.fakeCurrency_USD,
  ];

  fakeExchangeData: ExchangeDataI = {
    date: {
      day: '01',
      month: '01',
      year: '2023',
    },
    currency: {
      [this.fakeCurrency_AUD.charCode]: this.fakeCurrency_AUD,
      [this.fakeCurrency_EUR.charCode]: this.fakeCurrency_EUR,
      [this.fakeCurrency_USD.charCode]: this.fakeCurrency_USD,
    },
  };
}

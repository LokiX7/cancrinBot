import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { CurrencyI } from 'src/common/interfaces/currency.interface';
import { RawExchangeDataDto } from '../dto/raw-exchange-data.dto';
import { race } from 'rxjs';

export class ExchangeDataFormatter {
  public static format(rawExchangeData: RawExchangeDataDto): ExchangeDataI {
    const { Valute: rawCurrencies, Date: rawDate } = rawExchangeData;
    const formatedExchangeData: ExchangeDataI = {
      date: {
        day: '',
        month: '',
        year: '',
      },
      currency: {},
    };

    formatedExchangeData.date = this.dateFormatter(rawDate);
    formatedExchangeData.currency = this.currenciesFromatter(rawCurrencies);

    return formatedExchangeData;
  }

  // eslint-disable-next-line prettier/prettier
  private static currenciesFromatter(rawCurrencies: RawExchangeDataDto['Valute']): ExchangeDataI['currency'] {
    const currencies: ExchangeDataI['currency'] = {};
    for (const currency in rawCurrencies) {
      const rawCurrency = rawCurrencies[currency];
      const formatedCurrency: CurrencyI = {
        numCode: rawCurrency.NumCode,
        charCode: rawCurrency.CharCode,
        nominal: rawCurrency.Nominal,
        name: rawCurrency.Name,
        value: rawCurrency.Value,
        previous: rawCurrency.Previous,
      };
      currencies[formatedCurrency.charCode] = formatedCurrency;
    }

    return currencies;
  }

  // eslint-disable-next-line prettier/prettier
  private static dateFormatter(rawDate: RawExchangeDataDto['Date']): ExchangeDataI['date'] {
    const dateInstance = new Date(Date.parse(rawDate));

    const rawDay = dateInstance.getDate();
    const rawMonth = dateInstance.getMonth() + 1;
    const rawYear = dateInstance.getFullYear();

    const date: ExchangeDataI['date'] = {
      day: '',
      month: '',
      year: '',
    };

    if (rawDay < 10) {
      date.day = `0${rawDay}`;
    } else {
      date.day = `${rawDay}`;
    }

    if (rawMonth < 10) {
      date.month = `0${rawMonth}`;
    } else {
      date.month = `${rawMonth}`;
    }

    date.year = `${rawYear}`;

    return date;
  }
}

import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { CurrencyI } from 'src/common/interfaces/currency.interface';
import { RawCurrencyDataDto } from './dto/raw-currency-data.dto';

// Класс для обработки сырых данных
export class ParserDataFormatter {
  // Форматирование всех представленных сырых данных
  public format(rawExchangeData: RawCurrencyDataDto): ExchangeDataI {
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

  // Форматирование сырых валютных данных
  // eslint-disable-next-line prettier/prettier
  private currenciesFromatter(rawCurrencies: RawCurrencyDataDto['Valute']): ExchangeDataI['currency'] {
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

  // Форматирование сырой даты
  // eslint-disable-next-line prettier/prettier
  private dateFormatter(rawDate: RawCurrencyDataDto['Date']): ExchangeDataI['date'] {
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

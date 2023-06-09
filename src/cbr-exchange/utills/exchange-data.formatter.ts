import { Injectable } from '@nestjs/common';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ValuteI } from 'src/common/interfaces/valute.interface';
import { RawExchangeDataDto } from '../dto/raw-exchange-data.dto';

@Injectable()
export class ExchangeDataFormatter {
  public format(rawExchangeData: RawExchangeDataDto): ExchangeDataI {
    const { Valute: rawValutes, Date: rawDate } = rawExchangeData;
    const formatedExchangeData: ExchangeDataI = {
      date: {
        day: '',
        month: '',
        year: '',
      },
      valute: {},
    };

    formatedExchangeData.date = this.dateFormatter(rawDate);
    formatedExchangeData.valute = this.valutesFromatter(rawValutes);

    return formatedExchangeData;
  }

  // eslint-disable-next-line prettier/prettier
  private valutesFromatter(rawValutes: RawExchangeDataDto['Valute']): ExchangeDataI['valute'] {
    const valutes: ExchangeDataI['valute'] = {};

    for (const valute in rawValutes) {
      const rawValute = rawValutes[valute];
      const formatedValute: ValuteI = {
        numCode: rawValute.NumCode,
        charCode: rawValute.CharCode,
        nominal: rawValute.Nominal,
        name: rawValute.Name,
        value: rawValute.Value,
        previous: rawValute.Previous,
      };
      valutes[formatedValute.charCode] = formatedValute;
    }

    return valutes;
  }

  // eslint-disable-next-line prettier/prettier
  private dateFormatter(rawDate: RawExchangeDataDto['Date']): ExchangeDataI['date'] {
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

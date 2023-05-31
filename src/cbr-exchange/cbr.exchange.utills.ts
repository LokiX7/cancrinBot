import { Injectable } from '@nestjs/common';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';
import { RawExchangeDataDto } from './dto/raw-exchange-data.dto';
import { ValuteI } from '../common/interfaces/valute.interface';

@Injectable()
export class CbrExchangeUtills {
  public formatter(rawExchangeData: RawExchangeDataDto): ExchangeDataI {
    const { Valute: rawValutes, Date: rawDate } = rawExchangeData;
    const formatedExchangeData: ExchangeDataI = {
      date: Date.parse(rawDate),
      valute: {},
    };

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
      formatedExchangeData.valute[formatedValute.charCode] = formatedValute;
    }
    return formatedExchangeData;
  }
}

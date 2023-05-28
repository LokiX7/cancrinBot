import { Injectable } from '@nestjs/common';
import { ExchangeDataI } from './interfaces/exchangeData.interface';
import { RawExchangeDataDto } from './dto/rawExchangeData.dto';
import { ValuteI } from './interfaces/valute.interface';

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
        numCode: parseInt(rawValute.NumCode, 10),
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

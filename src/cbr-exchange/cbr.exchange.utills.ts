import { Injectable } from '@nestjs/common';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';
import { ValuteI } from 'src/common/interfaces/valute.interface';
import { RawExchangeDataDto } from './dto/raw-exchange-data.dto';

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

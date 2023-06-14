import { ValuteI } from '../common/interfaces/valute.interface';

export class MessageCreater {
  static createValuteFullDataString(valuteData: ValuteI): string {
    return (
      `${valuteData.name}` +
      `\n- <b>Буквенный код</b>: ${valuteData.charCode}` +
      `\n- <b>Цифровой код</b>: ${valuteData.numCode}` +
      `\n- <b>Номинал</b>: ${valuteData.nominal}` +
      `\n- <b>Обменный курс</b>: ${valuteData.value}`
    );
  }

  static createValuteExchangeDataString(valuteData: ValuteI): string {
    return `${valuteData.name} - ${valuteData.value.toFixed(2)} руб`;
  }

  static createValutesListString(valutes: ValuteI[]) {
    let count = 0;
    let message = '';

    for (const valute of valutes) {
      count++;
      message = message.concat(
        `${count}. ${valute.charCode} - ${valute.name}\n`,
      );
    }

    return message;
  }
}

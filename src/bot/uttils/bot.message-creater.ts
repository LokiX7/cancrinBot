import { CurrencyI } from '../../common/interfaces/currency.interface';

// Набор статических методов формирующие сообщения для клиента
export class MessageCreater {
  // Формирует сообщение содержащее полную информацию о валюте
  static createCurrencyFullDataString(currencyData: CurrencyI): string {
    return (
      `${currencyData.name}` +
      `\n- <b>Буквенный код</b>: ${currencyData.charCode}` +
      `\n- <b>Цифровой код</b>: ${currencyData.numCode}` +
      `\n- <b>Номинал</b>: ${currencyData.nominal}` +
      `\n- <b>Обменный курс</b>: ${currencyData.value}`
    );
  }
  // Формирует сообщение содержащее упрощённую информацию о валюте
  static createCurrencyExchangeDataString(currencyData: CurrencyI): string {
    return `${currencyData.name} - ${currencyData.value.toFixed(2)} руб`;
  }

  // Формирует сообщение со списком имён валют и их буквенных кодов
  static createCurrenciesListString(currencies: CurrencyI[]) {
    let count = 0;
    let message = '';

    for (const currency of currencies) {
      count++;
      message = message.concat(
        `${count}. ${currency.charCode} - ${currency.name}\n`,
      );
    }

    return message;
  }
}

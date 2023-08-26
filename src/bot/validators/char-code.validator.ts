import { CharCodeException } from 'src/common/exceptions/char-code.exception';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';

// Валидирует 3х буквенный код валюты который передал клиент
// Если валюты с таким кодом нет - генерирует исключение
export const charCodeValidation = (
  charCode: string,
  exchangeData: ExchangeDataI,
): void => {
  if (!(charCode in exchangeData.currency)) {
    throw new CharCodeException(charCode);
  }
};

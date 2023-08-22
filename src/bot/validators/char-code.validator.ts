import { CharCodeException } from 'src/common/exceptions/char-code.exception';
import { ExchangeDataI } from 'src/common/interfaces/exchangeData.interface';

export const charCodeValidation = (
  charCode: string,
  exchangeData: ExchangeDataI,
): void => {
  if (!(charCode in exchangeData.currency)) {
    throw new CharCodeException(charCode);
  }
};

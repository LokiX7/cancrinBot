export class CharCodeException extends Error {
  charCode: string;

  constructor(charCode: string) {
    super(`${charCode} не валютный код`);
    this.charCode = charCode;
  }
}

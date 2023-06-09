export class CharCodeException extends Error {
  charCode: string;

  constructor(charCode: string) {
    super(`${charCode} not a valute char code`);
    this.charCode = charCode;
  }
}

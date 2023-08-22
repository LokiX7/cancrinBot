export class CharCodeException extends Error {
  charCode: string;

  constructor(charCode: string) {
    super(`${charCode} not a currency char code`);
    this.charCode = charCode;
  }
}

import { Injectable } from '@nestjs/common';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';

@Injectable()
export class BotService {
  constructor(private readonly cbrExchangeService: CbrExchangeService) {}

  async getAvailableValutes(): Promise<string> {
    const valutes = await this.cbrExchangeService.getAllValutes();
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

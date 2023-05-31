import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { CharCodeException } from 'src/common/exceptions/char-code.exception';
import { Context } from 'telegraf';

@Catch(CharCodeException)
export class CharCodeExceptionFilter implements ExceptionFilter {
  async catch(exception: CharCodeException, host: ArgumentsHost) {
    const tgCtx = TelegrafArgumentsHost.create(host).getContext<Context>();
    await tgCtx.reply(`${exception.charCode} не код валюты.`);
  }
}

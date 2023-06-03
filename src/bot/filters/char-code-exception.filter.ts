import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { CharCodeException } from 'src/common/exceptions/char-code.exception';
import { Context } from 'telegraf';

@Catch(CharCodeException)
export class CharCodeExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(CharCodeExceptionFilter.name);

  async catch(exception: CharCodeException, host: ArgumentsHost) {
    const tgCtx = TelegrafArgumentsHost.create(host).getContext<Context>();
    this.logger.warn(
      `UserID ${tgCtx.message.from.id} -> "${exception.charCode}"`,
    );
    await tgCtx.reply(`${exception.charCode} не код валюты.`);
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CharCodeException } from 'src/common/exceptions/char-code.exception';

// Отлавливает исключение CharCodeException, логирует и отправляет ответ клиенту
@Catch(CharCodeException)
export class CharCodeExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(CharCodeExceptionFilter.name);

  // eslint-disable-next-line prettier/prettier
  async catch(exception: CharCodeException, host: ArgumentsHost): Promise<void> {
    const tgCtx = TelegrafArgumentsHost.create(host).getContext<Context>();

    this.logger.warn(
      `UserID ${tgCtx.message.from.id} -> "${exception.charCode}"`,
    );

    await tgCtx.reply(`${exception.charCode} не код валюты.`);
  }
}

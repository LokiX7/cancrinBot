import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Observable } from 'rxjs';
import { isAction } from '../guards/is-action.guard';

@Injectable()
export class UpdateLogInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('Update');

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // eslint-disable-next-line prettier/prettier
    const TgCtx = TelegrafExecutionContext.create(context).getContext<Context>();

    if (isAction(TgCtx)) {
      // eslint-disable-next-line prettier/prettier
      this.logger.debug(`UserID ${TgCtx.callbackQuery.from.id} -> [Action] ${TgCtx.callbackQuery['data']}`);
    } else {
      // eslint-disable-next-line prettier/prettier
      this.logger.debug(`UserID ${TgCtx.message.from.id} -> [${TgCtx.message['text']}] ${context.getHandler().name} `);
    }

    return next.handle();
  }
}

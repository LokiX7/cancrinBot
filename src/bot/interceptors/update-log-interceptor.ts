import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { Observable, tap } from 'rxjs';
import { Context } from 'telegraf';
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
      this.logger.log(`ID ${TgCtx.callbackQuery.from.id} -> [Action] ${TgCtx.callbackQuery['data']}`);
    } else {
      // eslint-disable-next-line prettier/prettier
      this.logger.log(`ID ${TgCtx.message.from.id} -> [${TgCtx.message['text']}] ${context.getHandler().name} `);
    }
    return next.handle();
  }
}

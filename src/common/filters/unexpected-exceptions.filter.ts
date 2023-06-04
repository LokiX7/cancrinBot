import { Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class UnexpectedExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger(UnexpectedExceptionsFilter.name);
  async catch(exception: Error) {
    this.logger.error(exception.message, exception.stack);
  }
}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ParserService } from './parser.service';
import { ParserDataFormatter } from './parser.formatter';
import { ParserApi } from './parser.api';

// Модуль для обращения к API www.cbr-xml-daily.ru
// Получает и предоставляет форматированные данные
@Module({
  imports: [HttpModule],
  providers: [ParserService, ParserApi, ParserDataFormatter],
  exports: [ParserService],
})
export class ParserModule {}

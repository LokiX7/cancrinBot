import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ParserService } from './parser.service';
import { ParserDataFormatter } from './parser.formatter';
import { ParserApi } from './parser.api';

@Module({
  imports: [HttpModule],
  providers: [ParserService, ParserApi, ParserDataFormatter],
  exports: [ParserService],
})
export class ParserModule {}

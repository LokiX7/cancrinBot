import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ExchangeEntity } from 'src/common/entities/exchange.entity';
import { ParserModule } from '../parser/parser.module';
import { CbrExchangeService } from './cbr-exchange.service';

@Module({
  imports: [
    ParserModule,
    HttpModule,
    TypeOrmModule.forFeature([ExchangeEntity]),
    ScheduleModule.forRoot(),
  ],
  providers: [CbrExchangeService],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

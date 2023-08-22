import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { CurrencyEntity } from 'src/common/entities/currency.entity';
import { ParserModule } from '../parser/parser.module';
import { CbrExchangeService } from './cbr-exchange.service';

@Module({
  imports: [
    ParserModule,
    HttpModule,
    TypeOrmModule.forFeature([CurrencyEntity]),
    ScheduleModule.forRoot(),
  ],
  providers: [CbrExchangeService],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

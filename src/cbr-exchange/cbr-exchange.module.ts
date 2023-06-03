import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CbrExchangeService } from './cbr-exchange.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuteEntity } from 'src/common/entity/valute.entity';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeUtills } from './cbr.exchange.utills';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ValuteEntity]),
    ScheduleModule.forRoot(),
  ],
  providers: [CbrExchangeService, CbrExchangeApi, CbrExchangeUtills],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ValuteEntity } from 'src/common/entity/valute.entity';
import { CbrExchangeService } from './cbr-exchange.service';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeUtills } from './cbr.exchange.utills';

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

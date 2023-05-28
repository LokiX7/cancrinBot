import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CbrExchangeService } from './cbr-exchange.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuteEntity } from 'src/entity/valute.entity';
import { CbrExchangeApiReq } from './cbr-exchange.apiReq';
import { CbrExchangeUtills } from './cbr.exchange.utills';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ValuteEntity])],
  providers: [CbrExchangeService, CbrExchangeApiReq, CbrExchangeUtills],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

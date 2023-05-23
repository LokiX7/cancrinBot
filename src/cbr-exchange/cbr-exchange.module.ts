import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CbrExchangeService } from './cbr-exchange.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuteEntity } from 'src/entity/valute.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([ValuteEntity])],
  providers: [CbrExchangeService],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

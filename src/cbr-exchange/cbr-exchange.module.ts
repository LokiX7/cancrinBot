import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CbrExchangeService } from './cbr-exchange.service';

@Module({
  imports: [HttpModule],
  providers: [CbrExchangeService],
  exports: [CbrExchangeService],
})
export class CbrExchangeModule {}

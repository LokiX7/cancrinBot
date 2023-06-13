import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValuteEntity } from '../common/entity/valute.entity';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeService } from './cbr-exchange.service';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';

describe('CbrExchangeService', () => {
  let service: CbrExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CbrExchangeService,
        {
          provide: getRepositoryToken(ValuteEntity),
          useValue: {},
        },
        {
          provide: CbrExchangeApi,
          useValue: {},
        },
        {
          provide: ExchangeDataFormatter,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CbrExchangeService>(CbrExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

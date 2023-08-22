import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CurrencyI } from '../common/interfaces/currency.interface';
import { CurrencyEntity } from '../common/entities/currency.entity';
import { Currenciestub } from '../common/test-uttils/currency.stub';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeService } from './cbr-exchange.service';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';

describe('CbrExchangeService', () => {
  let service: CbrExchangeService;
  let currenciestub: Currenciestub;

  beforeAll(async () => {
    currenciestub = new Currenciestub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CbrExchangeService,
        {
          provide: getRepositoryToken(CurrencyEntity),
          useValue: {
            save: async (data: CurrencyI[]) => data,
          },
        },
        {
          provide: CbrExchangeApi,
          useValue: {
            request: () => ({
              data: 'foo',
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CbrExchangeService>(CbrExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('initExchangeData should init exchangeData ', async () => {
    jest
      .spyOn(ExchangeDataFormatter, 'format')
      .mockImplementation(() => currenciestub.fakeExchangeData);

    expect(await service.initExchangeData()).toEqual(currenciestub.fakeCurrencies);
    expect(service.exchangeData).toEqual(currenciestub.fakeExchangeData);
  });
});

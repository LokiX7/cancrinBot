import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValuteI } from '../common/interfaces/valute.interface';
import { ValuteEntity } from '../common/entitys/valute.entity';
import { ValuteStub } from '../common/test-uttils/valute.stub';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeService } from './cbr-exchange.service';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';

describe('CbrExchangeService', () => {
  let service: CbrExchangeService;
  let valuteStub: ValuteStub;

  beforeAll(async () => {
    valuteStub = new ValuteStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CbrExchangeService,
        {
          provide: getRepositoryToken(ValuteEntity),
          useValue: {
            save: async (data: ValuteI[]) => data,
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
      .mockImplementation(() => valuteStub.fakeExchangeData);

    expect(await service.initExchangeData()).toEqual(valuteStub.fakeValutes);
    expect(service.exchangeData).toEqual(valuteStub.fakeExchangeData);
  });
});

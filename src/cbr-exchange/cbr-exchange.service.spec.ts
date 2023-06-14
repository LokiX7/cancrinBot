import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValuteEntity } from '../common/entity/valute.entity';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';
import { ValuteI } from '../common/interfaces/valute.interface';
import { CbrExchangeApi } from './cbr-exchange.api';
import { CbrExchangeService } from './cbr-exchange.service';
import { ExchangeDataFormatter } from './utills/exchange-data.formatter';

describe('CbrExchangeService', () => {
  let service: CbrExchangeService;

  const fakeValute_1: ValuteI = {
    numCode: '001',
    charCode: 'AUD',
    nominal: 1,
    name: 'Valute name',
    value: 50.1234,
    previous: 49.4321,
  };

  const fakeValute_2: ValuteI = {
    numCode: '002',
    charCode: 'EUR',
    nominal: 1,
    name: 'Valute name',
    value: 50.1234,
    previous: 49.4321,
  };

  const fakeValute_3: ValuteI = {
    numCode: '003',
    charCode: 'USD',
    nominal: 1,
    name: 'Valute name',
    value: 50.1234,
    previous: 49.4321,
  };

  const fakeValutes: ValuteI[] = [fakeValute_1, fakeValute_2, fakeValute_3];

  const fakeExchangeData: ExchangeDataI = {
    date: {
      day: '01',
      month: '01',
      year: '2023',
    },
    valute: {
      [fakeValute_1.charCode]: fakeValute_1,
      [fakeValute_2.charCode]: fakeValute_2,
      [fakeValute_3.charCode]: fakeValute_3,
    },
  };

  beforeAll(async () => {
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
      .mockImplementation(() => fakeExchangeData);

    expect(await service.initExchangeData()).toEqual(fakeValutes);
    expect(service.exchangeData).toEqual(fakeExchangeData);
  });
});

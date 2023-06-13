import { Test, TestingModule } from '@nestjs/testing';
import { CbrExchangeApi } from './cbr-exchange.api';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('CbrExchangeApi', () => {
  let api: CbrExchangeApi;

  const fakeResponse = {
    data: {
      Date: '2023-06-10T11:30:00+03:00',
      PreviousDate: '2023-06-09T11:30:00+03:00',
      PreviousURL: '//www.cbr-xml-daily.ru/archive/2023/06/09/daily_json.js',
      Timestamp: '2023-06-12T18:00:00+03:00',
      Valute: {
        AUD: {
          ID: 'R01010',
          NumCode: '036',
          CharCode: 'AUD',
          Nominal: 1,
          Name: 'Австралийский доллар',
          Value: 55.4361,
          Previous: 54.6904,
        },
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CbrExchangeApi,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn((url: string) => of(fakeResponse)),
          },
        },
      ],
    }).compile();

    api = module.get<CbrExchangeApi>(CbrExchangeApi);
  });

  it('should be defined', () => {
    expect(api).toBeDefined();
  });

  it('should return exchange data', async () => {
    const response = await api.request();
    expect(response).toEqual(fakeResponse);
  });
});

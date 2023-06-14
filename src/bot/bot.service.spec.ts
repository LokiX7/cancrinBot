import { Test, TestingModule } from '@nestjs/testing';
import { CbrExchangeService } from '../cbr-exchange/cbr-exchange.service';
import { BotService } from './bot.service';
import { ValuteI } from '../common/interfaces/valute.interface';
import { ExchangeDataI } from '../common/interfaces/exchangeData.interface';

describe('BotService', () => {
  let service: BotService;
  let fakeValute: ValuteI;
  let fakeExchangeData: ExchangeDataI;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: CbrExchangeService,
          useValue: {
            exchangeData: fakeExchangeData,
            getValuteByCharCode: async () => fakeValute,
          },
        },
      ],
    }).compile();

    fakeValute = {
      numCode: '001',
      charCode: 'AUD',
      nominal: 1,
      name: 'Valute name',
      value: 50.1234,
      previous: 49.4321,
    };

    fakeExchangeData = {
      date: {
        day: '01',
        month: '01',
        year: '2023',
      },
      valute: {
        [fakeValute.charCode]: fakeValute,
      },
    };

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getValute method should return valute', async () => {
    expect(await service.getValute(fakeValute.charCode)).toEqual(fakeValute);
  });

  test('getLastUpdateDate method should return exchangeData.date', async () => {
    expect(service.getLastUpdateDate()).toStrictEqual(fakeExchangeData.date);
  });
});

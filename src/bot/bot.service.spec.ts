import { Test, TestingModule } from '@nestjs/testing';
import { ValuteStub } from '../common/test-uttils/valute.stub';
import { CbrExchangeService } from '../cbr-exchange/cbr-exchange.service';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;
  let valuteStub: ValuteStub;

  beforeEach(async () => {
    valuteStub = new ValuteStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: CbrExchangeService,
          useValue: {
            exchangeData: valuteStub.fakeExchangeData,
            getValuteByCharCode: async () => valuteStub.fakeValute_AUD,
          },
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getValute method should return valute', async () => {
    // eslint-disable-next-line prettier/prettier
    expect(await service.getValute(valuteStub.fakeValute_AUD.charCode)).toEqual(valuteStub.fakeValute_AUD);
  });

  test('getLastUpdateDate method should return exchangeData.date', async () => {
    // eslint-disable-next-line prettier/prettier
    expect(service.getLastUpdateDate()).toStrictEqual(valuteStub.fakeExchangeData.date);
  });
});

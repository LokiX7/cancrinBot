import { Test, TestingModule } from '@nestjs/testing';
import { Currenciestub } from '../common/test-uttils/currency.stub';
import { CbrExchangeService } from '../cbr-exchange/cbr-exchange.service';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;
  let currenciestub: Currenciestub;

  beforeEach(async () => {
    currenciestub = new Currenciestub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: CbrExchangeService,
          useValue: {
            exchangeData: currenciestub.fakeExchangeData,
            getCurrencyByCharCode: async () => currenciestub.fakeCurrency_AUD,
          },
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getCurrency method should return currency', async () => {
    // eslint-disable-next-line prettier/prettier
    expect(await service.getCurrency(currenciestub.fakeCurrency_AUD.charCode)).toEqual(currenciestub.fakeCurrency_AUD);
  });

  test('getLastUpdateDate method should return exchangeData.date', async () => {
    // eslint-disable-next-line prettier/prettier
    expect(service.getLastUpdateDate()).toStrictEqual(currenciestub.fakeExchangeData.date);
  });
});

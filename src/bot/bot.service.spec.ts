import { Test, TestingModule } from '@nestjs/testing';
import { CbrExchangeService } from '../cbr-exchange/cbr-exchange.service';
import { BotService } from './bot.service';

describe('BotService', () => {
  let service: BotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotService,
        {
          provide: CbrExchangeService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<BotService>(BotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CbrExchangeService } from './cbr-exchange.service';

describe('CbrExchangeService', () => {
  let service: CbrExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CbrExchangeService],
    }).compile();

    service = module.get<CbrExchangeService>(CbrExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

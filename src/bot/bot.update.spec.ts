import { Test, TestingModule } from '@nestjs/testing';
import { Context, Telegraf } from 'telegraf';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { Currenciestub } from '../common/test-uttils/currency.stub';
import { Update } from 'telegraf/typings/core/types/typegram';
import { CurrencyI } from '../common/interfaces/currency.interface';

describe('BotUpdate', () => {
  let update: BotUpdate;
  let currenciestub: Currenciestub;
  let getCurrency_method_result: CurrencyI;
  let fakeCtx: Context<Update>;

  beforeEach(async () => {
    currenciestub = new Currenciestub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotUpdate,
        {
          provide: BotButtons,
          useValue: {
            startKeyboard: () => null,
            currenciesKeyboard: () => null,
          },
        },
        {
          provide: BotService,
          useValue: {
            getCurrencies: async () => currenciestub.fakeCurrencies,
            getCurrency: async (charCode: string) =>
              currenciestub.fakeCurrencies.find((currency: CurrencyI) => {
                if (currency.charCode == charCode) {
                  getCurrency_method_result = currency;
                  return currency;
                }
              }),
            getLastUpdateDate: () => currenciestub.fakeExchangeData.date,
          },
        },
        {
          provide: Telegraf,
          useValue: {},
        },
        {
          provide: 'DEFAULT_BOT_NAME',
          useValue: {
            telegram: {
              setMyCommands: () => null,
            },
          },
        },
      ],
    }).compile();

    fakeCtx = {
      reply: (msg: string) => msg,
      replyWithHTML: (msg: string) => msg,
      deleteMessage: () => null,
    } as unknown as Context<Update>;

    update = module.get<BotUpdate>(BotUpdate);
  });

  it('should be defined', () => {
    expect(update).toBeDefined();
  });

  test('start method should not to throw error', () => {
    expect(update.start(fakeCtx)).resolves.not.toThrowError();
  });

  test('showHelpMessage method should not to throw error', () => {
    expect(update.showHelpMessage(fakeCtx)).resolves.not.toThrowError();
  });

  test('showCurrenciesList method should not to throw error', () => {
    expect(update.showCurrenciesList(fakeCtx)).resolves.not.toThrowError();
  });

  test('showCurrencyData method should not to throw error', () => {
    // eslint-disable-next-line prettier/prettier
    expect(update.showCurrencyData(fakeCtx, '/help EUR')).resolves.not.toThrowError();
  });

  test('showCurrencyData method should corect match currency char code', () => {
    update.showCurrencyData(fakeCtx, '/help EUR');
    expect(getCurrency_method_result).toEqual(currenciestub.fakeCurrency_EUR);
  });

  test('showCurrencyExchnage method should not to throw error', () => {
    // eslint-disable-next-line prettier/prettier
    expect(update.showCurrencyExchange(fakeCtx, 'EUR')).resolves.not.toThrowError();
  });

  test('showCurrencyExchnage method should corect match currency char code', () => {
    update.showCurrencyExchange(fakeCtx, 'EUR');
    expect(getCurrency_method_result).toEqual(currenciestub.fakeCurrency_EUR);
  });

  test('showAvailableCurrencies method should not to throw error', () => {
    expect(update.showAvailableCurrencies(fakeCtx)).resolves.not.toThrowError();
  });

  test('getCurrencyExchange method should not to throw error', () => {
    fakeCtx = {
      reply: (msg: string) => msg,
      callbackQuery: { data: '/getCurrencyExchange_EUR' },
    } as unknown as Context<Update>;

    expect(update.getCurrencyExchange(fakeCtx)).resolves.not.toThrowError();
  });

  test('getCurrencyExchange method should corect match currency char code', () => {
    fakeCtx = {
      reply: (msg: string) => msg,
      callbackQuery: { data: '/getCurrencyExchange_EUR' },
    } as unknown as Context<Update>;

    update.getCurrencyExchange(fakeCtx);
    expect(getCurrency_method_result).toEqual(currenciestub.fakeCurrency_EUR);
  });
});

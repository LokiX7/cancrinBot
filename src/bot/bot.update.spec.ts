import { Test, TestingModule } from '@nestjs/testing';
import { Context, Telegraf } from 'telegraf';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { ValuteStub } from '../common/test-uttils/valute.stub';
import { Update } from 'telegraf/typings/core/types/typegram';
import { ValuteI } from '../common/interfaces/valute.interface';

describe('BotUpdate', () => {
  let update: BotUpdate;
  let valuteStub: ValuteStub;
  let getValute_method_result: ValuteI;
  let fakeCtx: Context<Update>;

  beforeEach(async () => {
    valuteStub = new ValuteStub();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BotUpdate,
        {
          provide: BotButtons,
          useValue: {
            startKeyboard: () => null,
            valutesKeyboard: () => null,
          },
        },
        {
          provide: BotService,
          useValue: {
            getValutes: async () => valuteStub.fakeValutes,
            getValute: async (charCode: string) =>
              valuteStub.fakeValutes.find((valute: ValuteI) => {
                if (valute.charCode == charCode) {
                  getValute_method_result = valute;
                  return valute;
                }
              }),
            getLastUpdateDate: () => valuteStub.fakeExchangeData.date,
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

  test('showValutesList method should not to throw error', () => {
    expect(update.showValutesList(fakeCtx)).resolves.not.toThrowError();
  });

  test('showValuteData method should not to throw error', () => {
    // eslint-disable-next-line prettier/prettier
    expect(update.showValuteData(fakeCtx, '/help EUR')).resolves.not.toThrowError();
  });

  test('showValuteData method should corect match valute char code', () => {
    update.showValuteData(fakeCtx, '/help EUR');
    expect(getValute_method_result).toEqual(valuteStub.fakeValute_EUR);
  });

  test('showValuteExchnage method should not to throw error', () => {
    // eslint-disable-next-line prettier/prettier
    expect(update.showValuteExchange(fakeCtx, 'EUR')).resolves.not.toThrowError();
  });

  test('showValuteExchnage method should corect match valute char code', () => {
    update.showValuteExchange(fakeCtx, 'EUR');
    expect(getValute_method_result).toEqual(valuteStub.fakeValute_EUR);
  });

  test('showAvailableValutes method should not to throw error', () => {
    expect(update.showAvailableValutes(fakeCtx)).resolves.not.toThrowError();
  });

  test('getValuteExchange method should not to throw error', () => {
    fakeCtx = {
      reply: (msg: string) => msg,
      callbackQuery: { data: '/getValuteExchange_EUR' },
    } as unknown as Context<Update>;

    expect(update.getValuteExchange(fakeCtx)).resolves.not.toThrowError();
  });

  test('getValuteExchange method should corect match valute char code', () => {
    fakeCtx = {
      reply: (msg: string) => msg,
      callbackQuery: { data: '/getValuteExchange_EUR' },
    } as unknown as Context<Update>;

    update.getValuteExchange(fakeCtx);
    expect(getValute_method_result).toEqual(valuteStub.fakeValute_EUR);
  });
});

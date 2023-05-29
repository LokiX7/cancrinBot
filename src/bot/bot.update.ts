import {
  Action,
  Ctx,
  Hears,
  InjectBot,
  Message,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';
import { botCommands } from './bot.commands';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly botButtons: BotButtons,
  ) {
    this.bot.telegram.setMyCommands(botCommands);
  }
  @Start()
  async start(@Ctx() ctx: Context) {
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(
      'Здравствуйте! Я CancrinBot помогу вам узнать актуальный курс от центрального банка России',
      this.botButtons.startKeyboard(),
    );
  }

  @Hears('/help')
  async showHelpMessage(@Ctx() ctx: Context) {
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(
      'Чтобы получить информацию об обмене интересующей вас валюты вы можете выбрать её в меню /valutes или просто написав её код в чат например EUR',
    );
    await ctx.reply(
      'Чтобы получить полную информацию о валюте введите /help [код валюты] например /help EUR',
    );
    await ctx.reply('Чтобы получить список имен и кодов валют введите /list');
  }

  @Hears('/list')
  async showValutesList(@Ctx() ctx: Context) {
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(await this.botService.createValuteList());
  }

  @Hears(/^\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  async showValuteData(@Ctx() ctx: Context, @Message('text') message: string) {
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(
      await this.botService.getValute(
        message
          .match(/\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[1]
          .toUpperCase(),
      ),
    );
  }

  @Hears(/^([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  // eslint-disable-next-line prettier/prettier
  async showValuteExchange(@Ctx() ctx: Context, @Message('text') message: string) {
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(
      await this.botService.getValuteExchange(
        message.match(/([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[0].toUpperCase(),
      ),
    );
  }

  @Hears(/^\/valutes/)
  async showAvailableValutes(@Ctx() ctx: Context) {
    const date = this.botService.getLastUpdateDate();
    if (ctx.message?.message_id) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
    await ctx.reply(
      `Данные от ${date.day}.${date.month}.${date.year}`,
      this.botButtons.valutesKeyboard({ getExchangeOnly: true }),
    );
  }

  @Action('availableValutes')
  async availableValutes(@Ctx() ctx: Context) {
    await this.showAvailableValutes(ctx);
  }

  @Action(/get(ValuteExchange|Valute)_[A-Z][A-Z][A-Z]/)
  async getValuteExchange(@Ctx() ctx: Context) {
    const data = 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : null;

    if (data) {
      const queryMatch = data.match(
        /get(ValuteExchange|Valute)_([A-Z][A-Z][A-Z])/,
      );

      switch (queryMatch[1]) {
        case 'Valute':
          await ctx.reply(await this.botService.getValute(queryMatch[2]));
          break;
        case 'ValuteExchange':
          // eslint-disable-next-line prettier/prettier
          await ctx.reply(await this.botService.getValuteExchange(queryMatch[2]));
      }
    }
  }
}

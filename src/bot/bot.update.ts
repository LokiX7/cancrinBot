import { Action, Ctx, Hears, Message, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    private readonly botService: BotService,
    private readonly botButtons: BotButtons,
  ) {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome!', this.botButtons.startKeyboard());
  }

  @Hears('/help')
  async showValutesList(@Ctx() ctx: Context) {
    ctx.reply(await this.botService.createValuteList());
  }

  @Hears(/^\/help [A-Z][A-Z][A-Z]$/)
  async showValuteData(@Ctx() ctx: Context, @Message('text') message: string) {
    ctx.reply(
      await this.botService.getValute(
        message.match(/\/help ([A-Z][A-Z][A-Z])/)[1],
      ),
    );
  }

  @Hears(/^\/[A-Z][A-Z][A-Z]$/)
  // eslint-disable-next-line prettier/prettier
  async showValuteExchange(@Ctx() ctx: Context, @Message('text') message: string) {
    ctx.reply(
      await this.botService.getValuteExchange(
        message.match(/[A-Z][A-Z][A-Z]/)[0],
      ),
    );
  }

  @Action('availableValutes')
  async availableValutes(@Ctx() ctx: Context) {
    await ctx.reply(
      'Валюты',
      this.botButtons.valutesKeyboard({ getExchangeOnly: true }),
    );
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
          ctx.reply(await this.botService.getValute(queryMatch[2]));
          break;
        case 'ValuteExchange':
          ctx.reply(await this.botService.getValuteExchange(queryMatch[2]));
      }
    }
  }
}

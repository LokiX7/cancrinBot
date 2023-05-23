import { Action, Ctx, Hears, Start, Update } from 'nestjs-telegraf';
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

  @Action('availableValutes')
  async availableValutes(@Ctx() ctx: Context) {
    const message = await this.botService.getAvailableValutes();
    await ctx.reply(message);
  }

  @Action('valuteExchange')
  async valuteExchange(@Ctx() ctx: Context) {
    await ctx.reply('Курс валюты');
  }

  @Action('convertValutes')
  async exchange(@Ctx() ctx: Context) {
    await ctx.reply('Конвертирование');
  }
}

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
import { UseFilters, UseInterceptors } from '@nestjs/common';
import { UpdateLogInterceptor } from './interceptors/update-log-interceptor';
import { CanDeleteMessage } from './guards/can-delete-message.guard';
import { CharCodeExceptionFilter } from './filters/char-code-exception.filter';

@Update()
@UseInterceptors(UpdateLogInterceptor)
export class BotUpdate {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
    private readonly botButtons: BotButtons,
  ) {
    this.bot.telegram.setMyCommands(botCommands);
  }

  private async deleteMessage(ctx: Context): Promise<void> {
    if (CanDeleteMessage(ctx)) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    this.deleteMessage(ctx);
    await ctx.reply(
      'Здравствуйте! Я CancrinBot помогу вам узнать актуальный курс от центрального банка России',
      this.botButtons.startKeyboard(),
    );
  }

  @Hears('/help')
  async showHelpMessage(@Ctx() ctx: Context) {
    this.deleteMessage(ctx);
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
    this.deleteMessage(ctx);

    await ctx.reply(await this.botService.createValuteList());
  }

  @Hears(/^\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  async showValuteData(@Ctx() ctx: Context, @Message('text') message: string) {
    const charCode = message
      .match(/\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[1]
      .toUpperCase();
    await ctx.reply(await this.botService.getValute(charCode));
  }

  @Hears(/^([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  // eslint-disable-next-line prettier/prettier
  async showValuteExchange(@Ctx() ctx: Context, @Message('text') message: string) {
    const charCode = message
      .match(/([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[0]
      .toUpperCase();

    await ctx.reply(await this.botService.getValuteExchange(charCode));
  }

  @Hears(/^\/valutes/)
  async showAvailableValutes(@Ctx() ctx: Context) {
    this.deleteMessage(ctx);
    const date = this.botService.getLastUpdateDate();

    await ctx.reply(
      `Данные от ${date.day}.${date.month}.${date.year}`,
      this.botButtons.valutesKeyboard(),
    );
  }

  @Action('availableValutes')
  async availableValutes(@Ctx() ctx: Context) {
    await this.showAvailableValutes(ctx);
  }

  @Action(/getValuteExchange_[A-Z][A-Z][A-Z]/)
  async getValuteExchange(@Ctx() ctx: Context) {
    const data = 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : null;

    if (data) {
      const queryMatch = data.match(/getValuteExchange_([A-Z][A-Z][A-Z])/);

      await ctx.reply(await this.botService.getValuteExchange(queryMatch[1]));
    }
  }
}

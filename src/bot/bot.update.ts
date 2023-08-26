import { UseFilters, UseInterceptors } from '@nestjs/common';
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
import { UpdateLogInterceptor } from './interceptors/update-log-interceptor';
import { CanDeleteMessage } from './guards/can-delete-message.guard';
import { CharCodeExceptionFilter } from './filters/char-code-exception.filter';
import { BotButtons } from './bot.buttons';
import { BotService } from './bot.service';
import { botCommands } from './bot.commands';
import { MessageCreater } from './uttils/bot.message-creater';

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

  // Удаляет сообщение у клиента переданное через контекст
  private async deleteMessage(ctx: Context): Promise<void> {
    if (CanDeleteMessage(ctx)) {
      await ctx.deleteMessage(ctx.message.message_id);
    }
  }

  // Оброботчик команды /start
  // Отпраляет клиенту приветствие и выводит меню кнопок доступных валют
  @Start()
  async start(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);
    await ctx.reply(
      'Здравствуйте! Я CancrinBot помогу вам узнать актуальный курс от центрального банка России',
      this.botButtons.startKeyboard(),
    );
  }

  // Оброботчик команды /help
  // Отпраляет клиенту руководство об использовании функционала бота
  @Hears('/help')
  async showHelpMessage(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);

    await ctx.reply(
      'Чтобы получить информацию об обмене интересующей вас валюты вы можете выбрать её в меню /currency или просто написав её код в чат например EUR',
    );
    await ctx.reply(
      'Чтобы получить полную информацию о валюте введите /help [код валюты] например /help EUR',
    );
    await ctx.reply('Чтобы получить список имен и кодов валют введите /list');
  }

  // Оброботчик команды /list
  // Отпраляет клиенту cписок всех доступных валют - коды валют и их наименования
  @Hears('/list')
  async showCurrenciesList(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);

    const currencies = await this.botService.getCurrencies();
    await ctx.reply(MessageCreater.createCurrenciesListString(currencies));
  }

  // Оброботчик команды /help [код валюты]
  // Матчит код валюты и отправляет клиенту полную информацию о валюте
  @Hears(/^\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  // eslint-disable-next-line prettier/prettier
  async showCurrencyData(@Ctx() ctx: Context, @Message('text') message: string): Promise<void> {
    const charCode = message
      .match(/\/help ([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[1]
      .toUpperCase();

    const currency = await this.botService.getCurrency(charCode);
    await ctx.replyWithHTML(
      MessageCreater.createCurrencyFullDataString(currency),
    );
  }

  // Матчит код валюты и отправляет клиенту упрощённую информацию о валюте
  @Hears(/^([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])$/)
  @UseFilters(CharCodeExceptionFilter)
  // eslint-disable-next-line prettier/prettier
  async showCurrencyExchange(@Ctx() ctx: Context, @Message('text') message: string): Promise<void> {
    const charCode = message
      .match(/([A-Z][A-Z][A-Z]|[a-z][a-z][a-z])/)[0]
      .toUpperCase();

    const currency = await this.botService.getCurrency(charCode);
    await ctx.reply(MessageCreater.createCurrencyExchangeDataString(currency));
  }

  // Оброботчик команды /currency
  // Отправляет клиенту меню кнопок доступных валют.
  @Hears('/currency')
  async showAvailableCurrencies(@Ctx() ctx: Context): Promise<void> {
    this.deleteMessage(ctx);
    const date = this.botService.getLastUpdateDate();

    await ctx.reply(
      `Данные на ${date.day}.${date.month}.${date.year}`,
      this.botButtons.currenciesKeyboard(),
    );
  }

  // Вызывается кнопкой софримрованной startKeyboard()
  // Отправляет клиенту меню кнопок доступных валют.
  @Action('availableCurrencies')
  async availableCurrencies(@Ctx() ctx: Context): Promise<void> {
    await this.showAvailableCurrencies(ctx);
  }

  // Вызывается одной из кнопок сформированных currenciesKeyboard()
  // Отправляет клиенту упрощённую информацию о валюте
  @Action(/getCurrencyExchange_[A-Z][A-Z][A-Z]/)
  async getCurrencyExchange(@Ctx() ctx: Context): Promise<void> {
    const data = 'data' in ctx.callbackQuery ? ctx.callbackQuery.data : null;

    if (data) {
      const queryMatch = data.match(/getCurrencyExchange_([A-Z][A-Z][A-Z])/);

      const currency = await this.botService.getCurrency(queryMatch[1]);
      await ctx.reply(
        MessageCreater.createCurrencyExchangeDataString(currency),
      );
    }
  }
}

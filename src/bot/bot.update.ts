import { Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { CbrExchangeService } from 'src/cbr-exchange/cbr-exchange.service';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private cbrExchangeService: CbrExchangeService) {}
  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply('Welcome!');
  }
  @Hears('/SayBoba')
  async sayBoba(@Ctx() ctx: Context) {
    await ctx.reply('BOBA!!');
  }
  @Hears('/exchanges')
  async exchanges(@Ctx() ctx: Context) {
    const exchange = await this.cbrExchangeService.getExchange();
    await ctx.reply(exchange.Date);
  }
}

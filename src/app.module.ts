import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [BotModule],
  providers: [AppService],
})
export class AppModule {}

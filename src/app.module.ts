import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuteEntity } from './common/entity/valute.entity';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    BotModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'test.db',
      entities: [ValuteEntity],
      synchronize: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

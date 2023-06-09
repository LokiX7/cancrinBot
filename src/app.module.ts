import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValuteEntity } from './common/entity/valute.entity';
import { UnexpectedExceptionsFilter } from './common/filters/unexpected-exceptions.filter';
import { BotModule } from './bot/bot.module';
import { AppService } from './app.service';

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
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: UnexpectedExceptionsFilter,
    },
  ],
})
export class AppModule {}

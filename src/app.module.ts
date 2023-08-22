import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from './common/entities/currency.entity';
import { UnexpectedExceptionsFilter } from './common/filters/unexpected-exceptions.filter';
import { BotModule } from './bot/bot.module';
import { AppService } from './app.service';

@Module({
  imports: [
    BotModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'cancrin.db',
      entities: [CurrencyEntity],
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

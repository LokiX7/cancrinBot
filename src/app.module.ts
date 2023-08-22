import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExchangeEntity } from './common/entities/exchange.entity';
import { UnexpectedExceptionsFilter } from './common/filters/unexpected-exceptions.filter';
import { BotModule } from './bot/bot.module';
import { AppService } from './app.service';

@Module({
  imports: [
    BotModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      entities: [ExchangeEntity],
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

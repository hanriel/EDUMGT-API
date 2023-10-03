import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramUpdate } from './telegram.update';
import { StartScene } from './scene/start.scene';
import { SettingsScene } from './scene/settings.scene';
import { ReportsScene } from './scene/reports.scene';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      middlewares: [session()],
    }),
  ],
  providers: [
    TelegramService,
    TelegramUpdate,
    StartScene,
    ReportsScene,
    SettingsScene,
  ],
  exports: [TelegramService]
})
export class TelegramModule {}
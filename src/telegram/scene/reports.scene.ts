import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { Context } from '../interface/context.interface'
import { START_SCENE_ID } from './start.scene'
import { TelegramService } from '../telegram.service'

export const REPORTS_SCENE_ID = 'reports'
@Scene(REPORTS_SCENE_ID)
export class ReportsScene {
  constructor(
    private readonly telegramService: TelegramService,
    ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() context: Context) {

    await context.reply(
      'Отчеты',
      Markup.keyboard(['Итоговый отчет', 'Темы уроков', 'Домашние задания', 'Оценки', 'Отметки об отсутсвии', '🔙 Назад']).oneTime().resize(),
    )
  }

  @Hears('Итоговый отчет')
  async onUnlinkAccount(@Ctx() context: Context) {
    this.telegramService.makeReport(context)
  }

  @Hears('🔙 Назад')
  async onBack(@Ctx() context: Context) {
    await context.scene.enter(START_SCENE_ID)
  }
}
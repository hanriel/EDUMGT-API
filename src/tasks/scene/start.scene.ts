import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf'
import { Context } from '../interface/context.interface'
import { SETTINGS_SCENE_ID } from './settings.scene'
import { TasksService } from '../tasks.service'
import { REPORTS_SCENE_ID } from './reports.scene'
 
export const START_SCENE_ID = 'start'
@Scene(START_SCENE_ID)
export class StartScene {
  constructor(
    private readonly telegramService: TasksService,
  ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() context: Context) {
    const { text, extra } = await this.telegramService.getStartMessage(
      context.from.id,
    )
    await context.replyWithHTML(text, extra)
  }

  @Hears('📑 Отчеты')
  async onReports(@Ctx() context: Context) {
    await context.scene.enter(REPORTS_SCENE_ID)
  }

  @Hears('⚙️ Настройки')
  async onSettings(@Ctx() context: Context) {
    await context.scene.enter(SETTINGS_SCENE_ID)
  }

}
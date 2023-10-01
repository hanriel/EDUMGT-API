import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf'
import { Markup } from 'telegraf'
import { Context } from '../interface/context.interface'
import { START_SCENE_ID } from './start.scene'
import { TasksService } from '../tasks.service'

export const SETTINGS_SCENE_ID = 'settings'
@Scene(SETTINGS_SCENE_ID)
export class SettingsScene {
  constructor(
    private readonly telegramService: TasksService,
    ) {}

  @SceneEnter()
  async onSceneEnter(@Ctx() context: Context) {

    await context.reply(
      'Settings',
      Markup.keyboard(['🔓 Unlink account', '🔙 Back']).oneTime().resize(),
    )
  }

  @Hears('🔓 Unlink account')
  async onUnlinkAccount(@Ctx() context: Context) {
    //await context.scene.enter()
  }

  @Hears('🔙 Back')
  async onBack(@Ctx() context: Context) {
    await context.scene.enter(START_SCENE_ID)
  }
}
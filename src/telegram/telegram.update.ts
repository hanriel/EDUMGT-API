import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf'
import { TelegramService } from './telegram.service'
import { Context } from './interface/context.interface'
import { START_SCENE_ID } from './scene/start.scene'

@Update()
export class TelegramUpdate {
  constructor(private readonly telegramService: TelegramService) {}

  @Start()
  async onStart(@Ctx() context: Context) {
    await context.scene.enter(START_SCENE_ID)
  }

  @Command('report')
  async reportCMD(@Ctx() context: Context) {
    await this.telegramService.makeReport(context);
  }

  @Action(/link-account:confirm:(.+)/)
  async onLinkAccountConfirm(@Ctx() context: Context & { match: unknown }) {
    await context.answerCbQuery()
    
    await context.editMessageText('Your account has been linked successfully.')
    await context.scene.enter(START_SCENE_ID)
  }

  @Action(/link-account:cancel:(.+)/)
  async onLinkAccountCancel(@Ctx() context: Context & { match: unknown }) {
    await context.answerCbQuery()
    
    await context.editMessageText('Your account has not been linked.')
    await context.scene.leave()
  }
}
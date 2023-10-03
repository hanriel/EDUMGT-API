// EDUMGT-API
//
// Copyright (c) 2023 Fedoseev Danil (https://hanriel.ru)
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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
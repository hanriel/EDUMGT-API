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

import { Ctx, Hears, Scene, SceneEnter } from 'nestjs-telegraf'
import { Context } from '../interface/context.interface'
import { SETTINGS_SCENE_ID } from './settings.scene'
import { TelegramService } from '../telegram.service'
import { REPORTS_SCENE_ID } from './reports.scene'
 
export const START_SCENE_ID = 'start'
@Scene(START_SCENE_ID)
export class StartScene {
  constructor(
    private readonly telegramService: TelegramService,
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
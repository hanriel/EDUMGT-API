import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksUpdate } from './tasks.update';
import { StartScene } from './scene/start.scene';
import { SettingsScene } from './scene/settings.scene';
import { ReportsScene } from './scene/reports.scene';

@Module({
  providers: [
    TasksService,
    TasksUpdate,
    StartScene,
    ReportsScene,
    SettingsScene,
  ],
})
export class TasksModule {}
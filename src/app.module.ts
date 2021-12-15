import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanningModule } from './planning/application/planning.module';

@Module({
  imports: [PlanningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

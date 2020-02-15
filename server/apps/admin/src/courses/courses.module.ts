import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { DbModule } from '@libs/db';
import { AppService } from '../app.service';

@Module({
  imports: [DbModule],
  controllers: [CoursesController],
  providers: [AppService]
})
export class CoursesModule {}

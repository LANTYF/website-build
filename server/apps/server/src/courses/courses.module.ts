import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CommonModule } from '@libs/common';
import { DbModule } from '@libs/db';

@Module({
  imports: [DbModule],
  controllers: [CoursesController]
})
export class CoursesModule {}

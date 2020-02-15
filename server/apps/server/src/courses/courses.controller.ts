import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';

@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly CourseModel) {}

  @Get()
  async find() {
    return await this.CourseModel.find().populate('episodes');
  }

  @Get('/:id')
  async detail(@Param('id') id: string) {
    return await this.CourseModel.findById(id).populate('episodes');
  }
}

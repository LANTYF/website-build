import { prop, arrayProp, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';

export class Episode {
  @prop()
  name: string;

  @prop()
  file: string;

  @arrayProp({
    ref: 'Course',
  })
  course: Ref<Course>;
}

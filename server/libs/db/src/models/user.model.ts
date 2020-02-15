import { prop, modelOptions } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop()
  username: string;

  @prop({
    set(val) {
      return val ? hashSync(val) : val;
    },
    get(val) {
      return val;
    },
    select: false,
  })
  password: string;
}

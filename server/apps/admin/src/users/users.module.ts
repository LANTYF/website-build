import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DbModule } from '@libs/db';
import { AppService } from '../app.service';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [AppService]
})
export class UsersModule {}

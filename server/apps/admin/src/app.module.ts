import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from '@libs/common';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { UsersModule } from './users/users.module';
// import OSS from 'ali-oss';
const MAO = require('multer-aliyun-oss');

@Module({
  imports: [CommonModule, CoursesModule, EpisodesModule, UsersModule, MulterModule.registerAsync({
    useFactory() {
      return {
        storage: MAO ({
          config: {
            region: process.env.OSS_REGION,
            accessKeyId: process.env.OSS_ACCESS_KEY_ID,
            accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
            bucket: process.env.OSS_BUCKET
          }
        })
      }
    }
  })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

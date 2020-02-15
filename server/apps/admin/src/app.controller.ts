import { Controller, Get, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';

@Controller()
@ApiTags('默认')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile('file') file) {
    return {
      url: `http://website-lx.oss-cn-shanghai.aliyuncs.com/${file.filename}`
    }
  }
}

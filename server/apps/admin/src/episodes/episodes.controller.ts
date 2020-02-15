import {
  Controller,
  Get,
  Inject,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { AppService } from '../app.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Course } from '@libs/db/models/course.model';

class CreateEpisodeDto {
  @ApiProperty({ description: '标题名字' })
  name: string;

  @ApiProperty({ description: '内容' })
  file: string;
}

@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    private readonly AppService: AppService,
    @InjectModel(Episode) private readonly episodeModel,
    @InjectModel(Course) private readonly CourseModel,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取课时列表' })
  index(@Query() query) {
    return this.AppService.index(this.episodeModel, query);
  }

  @Post()
  @ApiOperation({ summary: '创建新课时' })
  create(@Body() CreateEpisodeDto: CreateEpisodeDto) {
    return this.AppService.create(this.episodeModel, CreateEpisodeDto);
  }

  @Get('option')
  async option() {
    const courses = (await this.CourseModel.find()).map(i => ({
      label: i.title,
      value: i._id,
    }));
    return {
      title: '课时管理',
      searchMenuSpan: 8,
      translate: false,
      column: [
        {
          label: '所属课程',
          prop: 'course',
          type: 'select',
          dicData: courses,
          row: true,
        },
        {
          label: '课程名称',
          prop: 'name',
          sortable: true,
          search: true,
        },
        {
          label: '视频上传',
          prop: 'file',
          type: 'upload',
          action: 'upload',
          listType: 'picture-img',
          width: 150,
        },
      ],
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取课时详情' })
  detail(@Param('id') id: string) {
    return this.AppService.detail(this.episodeModel, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新课时信息' })
  update(@Param('id') id: string, @Body() updateEpisodeDto: CreateEpisodeDto) {
    return this.AppService.update(this.episodeModel, id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除课时' })
  async remove(@Param('id') id: string) {
    return this.AppService.remove(this.episodeModel, id);
  }
}

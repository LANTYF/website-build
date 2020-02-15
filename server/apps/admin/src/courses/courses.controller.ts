import { Controller, Get, Body, Post, Param, Put, Delete, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AppService } from '../app.service';

class CreateCourseDto {
  @ApiProperty({description: '标题名字'})
  title: string

  @ApiProperty({description: '内容'})
  cover: string
}

class data {
  pageSize: number
  currentPage: number
}

@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    private readonly AppService: AppService,
    @InjectModel(Course) private readonly courseModel
  ) {}
  
  @Get()
  @ApiOperation({summary: '获取课程列表'})
  index(@Query() query:data) {
    return this.AppService.index(this.courseModel, query)
  }

  @Post()
  @ApiOperation({summary: '创建新课程'})
  create(@Body() CreateCourseDto: CreateCourseDto) {
    return this.AppService.create(this.courseModel, CreateCourseDto)
  }

  @Get('option')
  option() {
    return {
      title: '课程管理',
      searchMenuSpan: 9,
      column: [{
        label: '课程名称',
        prop: 'title',
        sortable: true,
        search: true,
        row: true
      },{
        label: '封面图',
        prop: 'cover',
        dateType: 'upload',
        type: 'upload',
        listType: 'picture-img',
        action: '/upload',
        width: 150
      }]
    }
  }

  @Get('/:id')
  @ApiOperation({summary: '获取课程详情'})
  detail(@Param('id') id: string) {
    return this.AppService.detail(this.courseModel, id)
  }

  @Put('/:id')
  @ApiOperation({summary: '更新课程信息'})
  update(@Param('id') id: string, @Body() updateCourseDto: CreateCourseDto) {
    return this.AppService.update(this.courseModel, id, updateCourseDto)
    
  }

  @Delete('/:id')
  @ApiOperation({summary: '删除课程'})
  remove(@Param('id') id: string) {
    return this.AppService.remove(this.courseModel, id)
  }

}


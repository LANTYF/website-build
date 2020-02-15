import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { AppService } from '../app.service';

class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '小明' })
  username: string;

  @ApiProperty({ description: '用户密码', example: '9654321' })
  password: string;
}

@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(
    private readonly AppService: AppService,
    @InjectModel(User) private readonly userModel,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  index(@Query() query) {
    return this.AppService.index(this.userModel, query);
  }

  @Post()
  @ApiOperation({ summary: '创建新用户' })
  create(@Body() CreateUserDto: CreateUserDto) {
    return this.AppService.create(this.userModel, CreateUserDto);
  }

  @Get('option')
  option() {
    return {
      title: '用户管理',
      column: [
        {
          label: '用户名',
          prop: 'username',
        },
      ],
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '获取用户详情' })
  detail(@Param('id') id: string) {
    return this.AppService.detail(this.userModel, id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户信息' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.AppService.update(this.userModel, id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  async remove(@Param('id') id: string) {
    return this.AppService.remove(this.userModel, id);
  }
}

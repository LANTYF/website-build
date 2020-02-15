import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import RegisterDto from './Dto/RegisterDto';
import LoginDto from './Dto/LoginDto';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private JwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    const { username, password } = RegisterDto;
    const user = await this.userModel.create({ username, password });
    return user;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() LoginDto: LoginDto, @Req() req) {
    return {
      token: this.JwtService.sign(req.user._id.toString()),
    };
  }

  @Get('user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  user(@Req() req) {
    return req.user;
  }
}

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from '@libs/common';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, CommonModule],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy],
})
export class AuthModule {}

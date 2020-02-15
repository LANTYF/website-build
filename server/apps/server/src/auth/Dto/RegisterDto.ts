import { ApiProperty } from '@nestjs/swagger';

export default class RegisterDto {
  @ApiProperty({})
  username: string;
  @ApiProperty({})
  password: string;
}

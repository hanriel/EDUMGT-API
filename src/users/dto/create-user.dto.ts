import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'test@example.ru',
  })
  email: string;
  @ApiProperty({
    default: 'P@ssw0rd',
  })
  password: string;
  @ApiProperty({
    default: 'Данил',
  })
  fname: string;
  @ApiProperty({
    default: 'Федосеев',
  })
  lname: string;
  @ApiProperty({
    default: 'Александрович',
  })
  mname: string;
}

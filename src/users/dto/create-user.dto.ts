import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe' })
  readonly name: string;

  @ApiProperty({ example: 'johndoe@gmail.com' })
  readonly email: string;

  @ApiProperty({ example: 'password' })
  password: string;

  @ApiProperty({ example: 'Spain' })
  readonly country: string;
}

import { ApiProperty } from '@nestjs/swagger';
export class CreateBookDto {
  @ApiProperty({
    example: 'exhalation',
  })
  title: string;

  @ApiProperty({
    example: 'a science fiction book based on...'
  })
  description: string;

  @ApiProperty({
    example: 'Tedd Chiang'
  })
  author: string;
}

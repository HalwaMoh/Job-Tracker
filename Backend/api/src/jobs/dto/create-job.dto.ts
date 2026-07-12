import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {

  @ApiProperty({
    example: 'Amazon',
  })
  company!: string;


  @ApiProperty({
    example: 'Backend Intern',
  })
  position!: string;


  @ApiProperty({
    example: 'Applied',
  })
  status!: string;


  @ApiProperty({
    example: 'Remote',
    required: false,
  })
  location?: string;


  @ApiProperty({
    example: 'https://amazon.jobs',
    required: false,
  })
  jobUrl?: string;


  @ApiProperty({
    example: 'Applied today',
    required: false,
  })
  notes?: string;
}
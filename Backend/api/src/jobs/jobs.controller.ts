import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';


@ApiTags('Jobs')
@ApiBearerAuth()
@Controller('jobs')
@UseGuards(JwtAuthGuard)
export class JobsController {

  constructor(
    private readonly jobsService: JobsService,
  ) {}


  @Get()
  findAll(
    @CurrentUser() user: any,
  ) {
    return this.jobsService.findAll(
      user.userId,
    );
  }


  @Get(':id')
  findOne(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.jobsService.findOne(
      Number(id),
      user.userId,
    );
  }


  @Post()
  create(
    @Body() job: CreateJobDto,
    @CurrentUser() user: any,
  ) {
    return this.jobsService.create(
      job,
      user.userId,
    );
  }


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() job: UpdateJobDto,
    @CurrentUser() user: any,
  ) {
    return this.jobsService.update(
      Number(id),
      job,
      user.userId,
    );
  }


  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.jobsService.remove(
      Number(id),
      user.userId,
    );
  }

}
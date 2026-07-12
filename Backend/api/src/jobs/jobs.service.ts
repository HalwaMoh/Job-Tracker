import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from './job.entity';
import { User } from '../users/user.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(userId: number) {
    return this.jobRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const job = await this.jobRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return job;
  }

  async create(
    job: CreateJobDto,
    userId: number,
  ) {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newJob = this.jobRepository.create({
      ...job,
      user,
    });

    return this.jobRepository.save(newJob);
  }

  async update(
    id: number,
    job: Partial<Job>,
    userId: number,
  ) {
    const existingJob = await this.findOne(
      id,
      userId,
    );

    Object.assign(existingJob, job);

    return this.jobRepository.save(existingJob);
  }

  async remove(
    id: number,
    userId: number,
  ) {
    const job = await this.findOne(
      id,
      userId,
    );

    return this.jobRepository.remove(job);
  }
}
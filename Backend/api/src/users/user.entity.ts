import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Job } from '../jobs/job.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Job, (job) => job.user)
  jobs!: Job[];
}
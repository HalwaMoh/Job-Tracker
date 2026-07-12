import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from '../users/user.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company!: string;

  @Column()
  position!: string;

  @Column()
  status!: string;

  @Column({ nullable: true })
  location!: string;

  @Column({ nullable: true })
  jobUrl!: string;

  @Column({ nullable: true })
  notes!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User)
  user!: User;
}
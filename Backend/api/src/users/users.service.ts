import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = this.userRepository.create({
    email: user.email,
    password: hashedPassword,
  });

  return this.userRepository.save(newUser);
}
findByEmail(email: string) {
  return this.userRepository.findOne({
    where: { email },
    select: {
      id: true,
      email: true,
      password: true,
      createdAt: true,
    },
  });
}

}
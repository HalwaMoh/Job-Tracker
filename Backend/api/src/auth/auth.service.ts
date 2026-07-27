import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async register(registerDto: RegisterDto) {

    const existingUser = await this.usersService.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const user = await this.usersService.create(registerDto);

    return {
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }


  async login(loginDto: LoginDto) {

    console.log("STEP 1: LOGIN START");

    const user = await this.usersService.findByEmail(loginDto.email);

    console.log("STEP 2: USER FOUND", {
      id: user?.id,
      email: user?.email,
      password: user?.password,
    });


    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }


    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );


    console.log("STEP 3: PASSWORD RESULT", isPasswordValid);


    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }


    const payload = {
      sub: user.id,
      email: user.email,
    };


    const accessToken = await this.jwtService.signAsync(payload);


    return {
      access_token: accessToken,
    };
  }
}
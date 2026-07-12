import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

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

  console.log("STEP 4: PAYLOAD", payload);

  const accessToken = await this.jwtService.signAsync(payload);

  console.log("STEP 5: TOKEN CREATED");

  return {
    access_token: accessToken,
  };
}
}
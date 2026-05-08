import {JwtService} from '@nestjs/jwt';

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ) {

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    return user;

  }

  async login(
  email: string,
  password: string,
) {

  const user = await this.validateUser(
    email,
    password,
  );

  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
  };

  const access_token =
    await this.jwtService.signAsync(
      payload,
    );

  return {
    access_token,
  };

}

}
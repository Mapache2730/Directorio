import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto) {

    const userExists = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (userExists) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      10,
    );

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;

  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

  }

  async remove(id: number) {

    await this.findOne(id);

    return this.prisma.user.delete({
      where: { id },
    });

  }

}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './user.service';

import {
  CreateUserDto,
  UpdateUserDto,
} from './dto';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  // =========================
  // ADMIN CREA USERS
  // =========================

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  // =========================
  // ADMIN VE TODOS
  // =========================

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // =========================
  // TODOS SE VEN A SÍ MISMOS
  // =========================

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(
    @Req() req: any,
  ) {
    return req.user;
  }

  // =========================
  // ADMIN VE USER POR ID
  // =========================

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.findOne(id);
  }

  // =========================
  // ADMIN EDITA USERS
  // =========================

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      id,
      updateUserDto,
    );
  }

  // =========================
  // ADMIN ELIMINA USERS
  // =========================

  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.remove(id);
  }

}
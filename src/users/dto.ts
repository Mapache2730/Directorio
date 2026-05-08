import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
//--import { CreateUserDto } from './create-user.dto';


enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
}

export class CreateUserDto {
  
  @IsNotEmpty({message: 'El campo debe de ser texto'})
  @MaxLength(15)
  @MinLength(3, {message: 'El campo debe de tener al menos 3 letras'})
  name: string = '';
  
  @IsEmail({},{message: ""})
  @MaxLength(50)
  @MinLength(10, {message: 'El campo debe completarse'})
  email: string = '';
  
  @MinLength(6)
  password: string = '';
  
  @IsEnum(Role)
  role!: Role ;
  
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
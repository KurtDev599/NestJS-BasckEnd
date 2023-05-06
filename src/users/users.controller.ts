import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { VertifyEmailDto } from './dto/vertify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async getUserInfo(@Param('id') userId: string): Promise<UserInfoDto> {
    console.log(userId)
    return;
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    console.log(dto);
  }

  @Post('/email-vertify')
  async vertifyEmail(@Query() dto: VertifyEmailDto): Promise<string> {
    console.log(dto);
    return;
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    console.log(dto);
    return;
  }
}

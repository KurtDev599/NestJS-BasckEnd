import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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
    return await this.getUserInfo(userId);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    this.usersService.createUser(dto);
  }

  @Post('/email-vertify')
  async vertifyEmail(@Query() dto: VertifyEmailDto): Promise<string> {
    return await this.usersService.verifyMail(dto);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<string> {
    return await this.usersService.login(dto);
  }
}

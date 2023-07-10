import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
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
  async getUserInfo(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserInfoDto> {
    return await this.getUserInfo(userId);
  }

  @Get()
  async getAllUser(
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    console.log(offset, limit);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    return this.usersService.createUser(dto);
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

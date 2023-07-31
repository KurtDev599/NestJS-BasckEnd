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
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { VertifyEmailDto } from './dto/vertify-email.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserInfoDto } from './dto/user-info.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuccessInterceptor } from 'src/common/interceptor/success.interceptor';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';

@UseInterceptors(SuccessInterceptor) // Interceptor DI
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @Serialize(UserInfoDto)
  async getUserInfo(
    @Param('id') userId: string,
  ): Promise<UserInfoDto> {
    return await this.usersService.getUserInfo({ userId });
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
  async login(@Body() dto: UserLoginDto): Promise<{ accessToken: string }> {
    return await this.usersService.login(dto);
  }
}

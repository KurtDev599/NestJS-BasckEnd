import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/)
  @Transform(({ value, obj }) => {
    if (obj.password.includes(obj.name.trim())) {
      // obj.phoneNumber
      throw new BadRequestException('패스워드에 이름이나 전화번호가 들어 갈 수 없습니다.')
    }
    return value;
  })
  @IsNotEmpty()
  readonly password: string;
}

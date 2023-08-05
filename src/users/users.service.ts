import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { DataSource, Repository } from 'typeorm';
import * as uuid from 'uuid';
import { UserInfoDto } from './dto/user-info.dto';
import { UserEntity } from './entities/user.entity';
import { ulid } from 'ulid';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private dataSource: DataSource,
  ) {}
  async createUser({ name, email, password }) {
    await this.checkUserExitss(email);

    const sigupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, sigupVerifyToken);
    await this.sendMemberJoinEmail(email, sigupVerifyToken);
  }

  async checkUserExitss(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });
    if (user) {
      throw new HttpException('중복된 이메일 입니다.', HttpStatus.UNAUTHORIZED);
    }
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVertifyToken: string,
  ) {
    await this.dataSource.transaction(async (manager) => {
      const user = new UserEntity();
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = hashedPassword;
      user.signupVertifyToken = signupVertifyToken;
      await manager.save(user);
    });
  }

  async sendMemberJoinEmail(email: string, signupVertifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVertifyToken,
    );
  }

  async verifyMail({ sigupVerifyToken }): Promise<string> {
    throw new Error('Method not implemented');
  }

  async login({ email, password }): Promise<{ accessToken: string }> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('로그인 실패');
    }
  }

  async getUserInfo({ userId }): Promise<UserInfoDto> {
    const user = this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

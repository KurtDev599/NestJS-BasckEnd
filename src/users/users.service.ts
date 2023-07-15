import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { UserInfoDto } from './dto/user-info.dto';
import { UserEntity } from './entities/user.entity';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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
      throw new HttpException(
        '중복된 이메일 입니다.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVertifyToken: string,
  ) {
    const user = new UserEntity();
    user.id = ulid()
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVertifyToken = signupVertifyToken;
    await this.usersRepository.save(user);
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

  async login({ email, password }): Promise<string> {
    throw new Error('Method not implemented');
  }

  async getUserInfo({ userId: string }): Promise<UserInfoDto> {
    throw new Error('Method not implemented');
  }
}

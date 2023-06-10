import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import * as uuid from 'uuid';
import { UserInfoDto } from './dto/user-info.dto';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser({ name, email, password }) {
    await this.checkUserExitss(email);

    const sigupVerifyToken = uuid.v1();

    await this.saveUser(name, email, password, sigupVerifyToken);
    await this.sendMemberJoinEmail(email, sigupVerifyToken);
  }

  async checkUserExitss(email: string) {
    return false;
  }

  async saveUser(
    name: string,
    email: string,
    password: string,
    sigupVerifyToken: string,
  ) {
    return false;
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

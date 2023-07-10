import { Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { EmailOption } from './EmailOption';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transport: Mail;

  constructor(private readonly configService: ConfigService) {
    this.transport = nodemailer.createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        user: this.configService.get('EMAIL_AUTH_USER'),
        pass: this.configService.get('EMAIL_AUTH_PASSWORD'),
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    sigupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3000';
    const url = `${baseUrl}/users/email-vertify?signupVerifyToken=${sigupVerifyToken}`;

    const mailOprions: EmailOption = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br />
                <form action="${url}" method="POST">
                  <button>가입확인</button>
                </form>
            `,
    };

    return await this.transport.sendMail(mailOprions);
  }
}

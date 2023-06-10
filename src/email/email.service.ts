import { Injectable } from '@nestjs/common';
import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { EmailOption } from './EmailOption';

@Injectable()
export class EmailService {
    private transport: Mail;

    constructor() {
        this.transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: '100kims27@gmail.com',
                pass: 'xwjzdipewaoaqybv'
            }
        })
    }

    async sendMemberJoinVerification(emailAddress: string, sigupVerifyToken: string) {
        const baseUrl ='http://localhost:3000';
        const url = `${baseUrl}/users/email-vertify?signupVerifyToken=${sigupVerifyToken}`;

        const mailOprions: EmailOption = {
            to: emailAddress,
            subject: '가입 인증 메일',
            html : `
                가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br />
                <form action="${url}" method="POST">
                  <button>가입확인</button>
                </form>
            `
        }

        return await this.transport.sendMail(mailOprions);
    }
}

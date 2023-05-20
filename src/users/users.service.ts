import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
    constructor(
        private emailService: EmailService
    ) {}
    async createUser(name: string, email: string, password: string) {

    }

    async sendMemberJoinEmail(email: string, signupVertifyToken: string) {

    }
}

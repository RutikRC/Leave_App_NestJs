import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schema/users.schema';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/auth/auth/auth.decorator';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Public()
    @Post('/signup')
    async createUser(
        @Body ('password') password: string,
        @Body ('username') username: string,
        @Body ('role') role: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.usersService.createUser(
            username,
            hashedPassword,
            role,
        );
        return result;
    }
}
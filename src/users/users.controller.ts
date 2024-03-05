import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { Public } from 'src/auth/auth.decorator';

@Controller('auth')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Public()
    @Post('/signup')
    async createUser(
        @Body ('password') password: string,
        @Body ('username') username: string,
        @Body ('role') role: string,
    ): Promise<{ username: string, _id: string }> { // Response object without password field
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result: User = await this.usersService.createUser(
            username,
            hashedPassword,
            role,
        );
        // Return response object without password field
        return {
            username: result.username,
            _id: result._id.toString(), // Convert ObjectId to string
        };
    }
}

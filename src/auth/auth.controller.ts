import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Param, NotFoundException, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorator';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(UsersService) private usersService: UsersService, // Inject UsersService
  ) {}


  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard) // Secure the endpoint if necessary
  @Get('user/:id') // Define a new endpoint to get user details by ID
  async getUserById(@Param('id') userId: string) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
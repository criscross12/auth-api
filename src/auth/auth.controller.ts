// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authService: AuthService
  ) {}

  /*@Post('login')
  async login(@Body() body: {email: string; password: string}){
    const { email, password } = body;
    const result = await this.authService.login(email, password);
    return result;
  }*/

  @Post('register')
  async register(@Body() body: { email: string; password: string; role: string }) {
    const user = await this.usersService.register(body.email, body.password, body.role);

    const payload = { email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}

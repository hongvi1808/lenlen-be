import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { NoGlobalAuth } from 'src/configs/decorators/no-auth.decorator';
import { SetCookieInterceptor } from 'src/configs/interceptions/set-cookie.interceptor';
import { RefreshTokenAuthGuard } from 'src/configs/guards/refresh-token-auth.guard';
import { SessionUser } from 'src/configs/decorators/session-user.decorator';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/configs/guards/google-auth.guard';
import { SYSTEM_KEY } from 'src/common/constants/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @UseGuards(RefreshTokenAuthGuard)
  @UseInterceptors(SetCookieInterceptor)
  @Get('refresh-token')
  async refrehToken(@SessionUser() user: SessionUserModel) {
    return this.authService.refreshToken(user);
  }

  @Get('logout')
  async logut(@SessionUser() user: SessionUserModel, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(user, res);
  }

  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@SessionUser() user: SessionUserModel) { }

  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@SessionUser() user: SessionUserModel) {

    return this.authService.googleCalback(user);
  }

}

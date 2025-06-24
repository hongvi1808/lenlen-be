import { Controller, Get, Post, Body, UseInterceptors, UseGuards, Res, Inject, OnModuleInit, Param, Req } from '@nestjs/common';
import { NoGlobalAuth } from 'src/configs/decorators/no-auth.decorator';
import { SetCookieInterceptor } from 'src/configs/interceptions/set-cookie.interceptor';
import { RefreshTokenAuthGuard } from 'src/configs/guards/refresh-token-auth.guard';
import { SessionUser } from 'src/configs/decorators/session-user.decorator';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/configs/guards/google-auth.guard';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResp, LoginAuthDto, RegisterAuthDto, UserDataCallback } from 'proto/generated/proto/auth';
import { SYSTEM_KEY } from 'src/common/constants/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('login')
  async login(@Body() body: LoginAuthDto): Promise<Observable<AuthResp>> {
    return this.authService.logIn(body)
  }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body)
  }

  @UseGuards(RefreshTokenAuthGuard)
  @UseInterceptors(SetCookieInterceptor)
  @Get('refresh-token')
  async refrehToken(@SessionUser() user: SessionUserModel) {
    return this.authService.refreshToken(user)
  }

  @Get('logout')
  async logut(@SessionUser() user: SessionUserModel, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(user, res);
  }
  @Get('user/:id')
  async getUser(@SessionUser() user: SessionUserModel,@Param('id') id: string) {
    return this.authService.getUserById(id);
  }
  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@SessionUser() user: SessionUserModel) { }

  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@SessionUser()  user: UserDataCallback) {
    return this.authService.googleAuthCallback(user)
  }

}

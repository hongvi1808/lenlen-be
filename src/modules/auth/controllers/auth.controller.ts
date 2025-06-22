import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Res, Inject, OnModuleInit } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { NoGlobalAuth } from 'src/configs/decorators/no-auth.decorator';
import { SetCookieInterceptor } from 'src/configs/interceptions/set-cookie.interceptor';
import { RefreshTokenAuthGuard } from 'src/configs/guards/refresh-token-auth.guard';
import { SessionUser } from 'src/configs/decorators/session-user.decorator';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { Response } from 'express';
import { GoogleAuthGuard } from 'src/configs/guards/google-auth.guard';
import { SYSTEM_KEY } from 'src/common/constants/enums';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME, AUTHENTICATION_PACKAGE_NAME, AuthResp, AuthServiceClient, LoginAuthDto, RegisterAuthDto } from 'proto/generated/proto/auth';
import { map, Observable } from 'rxjs';

@Controller('auth')
export class AuthController implements OnModuleInit {
  private authClient: AuthServiceClient;
  constructor(
    @Inject(AUTHENTICATION_PACKAGE_NAME) private clientGrpc: ClientGrpc
  ) { }
  onModuleInit() {
    this.authClient = this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
  }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('login')
  async login(@Body() body: LoginAuthDto): Promise<Observable<AuthResp>> {
    return this.authClient.logIn(body)
  }

  @NoGlobalAuth()
  @UseInterceptors(SetCookieInterceptor)
  @Post('register')
  async register(@Body() body: RegisterAuthDto) {
    return this.authClient.register(body)
  }

  @UseGuards(RefreshTokenAuthGuard)
  @UseInterceptors(SetCookieInterceptor)
  @Get('refresh-token')
  async refrehToken(@SessionUser() user: SessionUserModel) {
  }

  @Get('logout')
  async logut(@SessionUser() user: SessionUserModel, @Res({ passthrough: true }) res: Response) {
  }

  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async googleAuth(@SessionUser() user: SessionUserModel) { }

  @NoGlobalAuth()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@SessionUser() user: SessionUserModel) {

  }

}

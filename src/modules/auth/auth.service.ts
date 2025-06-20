import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { Response } from 'express';
import { SYSTEM_KEY } from 'src/common/constants/enums';

@Injectable()
export class AuthService {
  async login(body: LoginDto) {
    return {refreshToken: 'abc', body};
  }
  async register(body: RegisterDto) {
    return body;
  }
  async refreshToken(userSession: SessionUserModel) {
    return userSession;
  }
  async logout(userSession: SessionUserModel, res: Response) {
    res.clearCookie(SYSTEM_KEY.RefreshTokenCookieKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2592000000, // 30 days
    });
    return userSession;
  }
  async googleCalback(userSession: SessionUserModel) {
    return userSession;
  }

}

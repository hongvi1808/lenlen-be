import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { AUTH_SERVICE_NAME, AUTHENTICATION_PACKAGE_NAME, AuthResp, AuthServiceClient, LoginAuthDto, RegisterAuthDto } from 'proto/generated/proto/auth';
import { USER_SERVICE_NAME, UserServiceClient } from 'proto/generated/proto/user';
import { Observable } from 'rxjs';
import { SYSTEM_KEY } from 'src/common/constants/enums';
import { SessionUserModel } from 'src/common/models/session-user.model';
import { RedisService } from 'src/common/redis/redis.service';

@Injectable()
export class AuthService implements OnModuleInit {
  private authClient: AuthServiceClient;
  private userClient: UserServiceClient;
  constructor(
    @Inject(AUTHENTICATION_PACKAGE_NAME) private clientGrpc: ClientGrpc,
    private readonly redisClient: RedisService,
  ) { }
  onModuleInit() {
    this.authClient = this.clientGrpc.getService<AuthServiceClient>(AUTH_SERVICE_NAME)
    this.userClient = this.clientGrpc.getService<UserServiceClient>(USER_SERVICE_NAME)
  }
  async logIn(body: LoginAuthDto): Promise<Observable<AuthResp>> {
    const res = this.authClient.logIn(body)
    return res
  }
  async register(body: RegisterAuthDto): Promise<Observable<AuthResp>> {
    const res = this.authClient.register(body)
    return res
  }
  async refreshToken(sUser: SessionUserModel): Promise<Observable<AuthResp>> {
    const res = this.authClient.refreshToken(sUser)
    return res
  }
  async logout(sUser: SessionUserModel, res: Response) {
    await this.addSidToBlacklist(sUser.sid)
    res.clearCookie(SYSTEM_KEY.RefreshTokenCookieKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Adjust as necessary
      maxAge: 2592000000, // 30 days
    });

  }
  async getUserById(userId: string): Promise<any> {
    return this.userClient.getUserById({ id: userId });

  }
  async sidInBlacklist(sid: string): Promise<string | null> {
    return this.redisClient.get(`${SYSTEM_KEY.PrefixKeySessionBlackList}_${sid}`);

  }
  async addSidToBlacklist(sid: string): Promise<any> {
    return this.redisClient.set(`${SYSTEM_KEY.PrefixKeySessionBlackList}_${sid}`, 1,)

  }

}

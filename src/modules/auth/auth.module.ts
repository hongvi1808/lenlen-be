import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './passports/access-token.strategy';
import { RefreshTokenStrategy } from './passports/refresh-token.strategy';
import { GoogleStrategy } from './passports/google.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTHENTICATION_PACKAGE_NAME } from 'proto/generated/proto/auth';
import { AuthService } from './auth.service';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { USER_PACKAGE_NAME } from 'proto/generated/proto/user';
import { LenRedisModule } from 'src/common/redis/redis.module';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
    // }),
    ClientsModule.registerAsync([{
      name: AUTHENTICATION_PACKAGE_NAME,
      useFactory: () => ({
        name: AUTHENTICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_CONNECTION_URL,
          package: [AUTHENTICATION_PACKAGE_NAME, USER_PACKAGE_NAME],
          protoPath: ['proto/auth.proto', 'proto/user.proto']
        },
      }),
    }]),
    LenRedisModule,
  ],
  controllers: [AuthController,],
  providers: [ AuthService, AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy, ],
  exports: [AuthService]
})
export class AuthModule { }

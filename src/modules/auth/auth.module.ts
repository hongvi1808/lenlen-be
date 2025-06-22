import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './passports/access-token.strategy';
import { RefreshTokenStrategy } from './passports/refresh-token.strategy';
import { GoogleStrategy } from './passports/google.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AUTHENTICATION_PACKAGE_NAME } from 'proto/generated/proto/auth';

@Module({
  imports: [
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
    // }),
    ClientsModule.register([
      {
        name: AUTHENTICATION_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.GRPC_CONNECTION_URL,
          package: AUTHENTICATION_PACKAGE_NAME,
          protoPath: ['proto/auth.proto', 'proto/user.proto']
        },
      },
    ]),
  ],
  controllers: [AuthController,],
  providers: [ AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy],
})
export class AuthModule { }

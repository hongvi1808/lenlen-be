import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback  } from "passport-google-oauth20";
import { SYSTEM_KEY } from "src/common/constants/enums";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, SYSTEM_KEY.GooglePassportKey) {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID', ''),
            clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET', ''),
            callbackURL: configService.getOrThrow<string>('GOOGLE_CALLBACK_URL', ''),
            scope: ['email', 'profile'],
            passReqToCallback: true,
        });
    }
    validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback ) {
        const {name, emails, sub} = profile;
        const user = { id: sub, emails, name,  };
        // done(null, user);
        console.log('Google Strategy User:', profile);
        return user;
    }
}
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SYSTEM_KEY } from "src/common/constants/enums";
import { SessionUserModel } from "src/common/models/session-user.model";
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, SYSTEM_KEY.AccessTokenPassportKey) {

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET', ''),
            
            
        });
    }

    validate(payload: SessionUserModel): unknown {
        // This method is called by Passport after the JWT is verified.
        if (!payload || !payload.sid) {
            throw new Error('Invalid token payload');
        }
       return payload;
    }
}

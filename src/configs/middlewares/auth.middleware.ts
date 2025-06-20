import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { headers, originalUrl } = req;
    const token: string = headers['authorization']
    const excludeUrls = ['/api/v1/auth/login', '/api/v1/auth/register', '/api/v1/auth/google']

    if (!token && !excludeUrls.includes(originalUrl))
      throw new UnauthorizedException('Missing Authorization header');


    if (token && !token.startsWith('Bearer'))
      throw new UnauthorizedException('Invaliding Authorization header', 'AuthMiddleware');


    next();
  }
}

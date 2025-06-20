import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { headers, originalUrl } = req;
    const token: string = headers['authorization']
    const excludeUrls = ['auth/login', 'auth/register']

    if (!token && !excludeUrls.includes(originalUrl)) {
      Logger.error('Not found Authorization in headers')
      throw new UnauthorizedException('Missing Authorization header');
    }

    if (!token.startsWith('Bearer')) {
      Logger.error('Request authentication is not true format')
      throw new UnauthorizedException('Invaliding Authorization header');
    }

    next();
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { SYSTEM_KEY } from 'src/common/constants/enums';

@Injectable()
export class RefreshTokenAuthGuard extends AuthGuard(SYSTEM_KEY.RefreshTokenPassportKey) {}


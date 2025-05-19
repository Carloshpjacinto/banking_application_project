/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import { ValidateJwtToken } from 'src/modules/auth/tools/validateJwtToken.tool';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: FindUserByIdService,
    private readonly validateJwtToken: ValidateJwtToken,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Invalid token');

    const token = authorization.split(' ')[1];

    const { valid, decoded } = await this.validateJwtToken.execute(token);

    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');

    const user = await this.userService.execute(Number(decoded.sub));

    request.user = user;

    return true;
  }
}

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/user.entity';

interface JwtPayload {
  sub: number;
  name: string;
}

@Injectable()
export class GenerateJwtToken {
  constructor(private readonly jwtService: JwtService) {}

  execute(user: User, expiresIn: string = '1d') {
    const payload: JwtPayload = { sub: user.id, name: user.name };
    const options: JwtSignOptions = {
      expiresIn: expiresIn,
      issuer: 'kontopp_bank',
      audience: 'users',
    };

    const token = this.jwtService.sign(payload, options);

    return { access_token: token };
  }
}

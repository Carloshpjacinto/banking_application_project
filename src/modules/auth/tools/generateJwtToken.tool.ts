import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class GenerateJwtToken {
  constructor(private readonly jwtService: JwtService) {}

  execute(user: User, expiresIn: string = '1d') {
    const payload = {
      sub: user.id,
      name: user.name,
      CPF: user.CPF,
      email: user.email,
    };
    const options = {
      expiresIn: expiresIn,
      issuer: 'kontopp_bank',
      audience: 'users',
    };

    return { access_token: this.jwtService.sign(payload, options) };
  }
}

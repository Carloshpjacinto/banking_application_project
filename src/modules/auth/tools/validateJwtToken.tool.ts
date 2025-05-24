/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateTokenDTO } from '../dto/validate-token-auth.dto';

@Injectable()
export class ValidateJwtToken {
  constructor(private readonly jwtService: JwtService) {}

  async execute(token: string): Promise<ValidateTokenDTO> {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
        issuer: 'kontopp_bank',
        audience: 'users',
      });

      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, message: error.message };
    }
  }
}

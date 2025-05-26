/* eslint-disable @typescript-eslint/unbound-method */
import { JwtService } from '@nestjs/jwt';
import { GenerateJwtToken } from '../tools/generateJwtToken.tool';
import { User } from 'src/modules/user/entities/user.entity';

describe('GenerateJwtToken', () => {
  let jwtService: JwtService;
  let generateJwtToken: GenerateJwtToken;

  beforeEach(() => {
    jwtService = {
      sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    } as unknown as JwtService;

    generateJwtToken = new GenerateJwtToken(jwtService);
  });

  it('should generate a JWT token with default expiresIn', () => {
    const user: User = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@email.com',
      CPF: '123.456.789-00',
    };

    const result = generateJwtToken.execute(user);

    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: user.id, name: user.name, CPF: user.CPF, email: user.email },
      {
        expiresIn: '1d',
        issuer: 'kontopp_bank',
        audience: 'users',
      },
    );
  });

  it('should generate a JWT token with custom expiresIn', () => {
    const user: User = {
      id: 2,
      name: 'Joana',
      email: 'joana@email.com',
      CPF: '987.654.321-00',
    };

    const result = generateJwtToken.execute(user, '2h');

    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    expect(jwtService.sign).toHaveBeenCalledWith(
      { sub: user.id, name: user.name, CPF: user.CPF, email: user.email },
      {
        expiresIn: '2h',
        issuer: 'kontopp_bank',
        audience: 'users',
      },
    );
  });
});

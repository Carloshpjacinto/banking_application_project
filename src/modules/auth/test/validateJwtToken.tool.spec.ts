/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ValidateJwtToken } from '../tools/validateJwtToken.tool';
import { JwtService } from '@nestjs/jwt';

describe('ValidateJwtToken', () => {
  let validateJwtToken: ValidateJwtToken;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    validateJwtToken = new ValidateJwtToken(jwtService);
  });

  it('should return valid and the decoded payload when the token is valid', async () => {
    const mockToken = 'token.valido.aqui';
    const mockDecoded = { sub: '123', name: 'Carlos' };

    (jwtService.verifyAsync as jest.Mock).mockResolvedValue(mockDecoded);

    const result = await validateJwtToken.execute(mockToken);

    expect(jwtService.verifyAsync).toHaveBeenCalledWith(mockToken, {
      secret: process.env.JWT_SECRET,
      issuer: 'kontopp_bank',
      audience: 'users',
    });

    expect(result).toEqual({
      valid: true,
      decoded: mockDecoded,
    });
  });

  it('should return invalid with an error message when the token is invalid', async () => {
    const mockToken = 'token.invalido';
    const mockError = new Error('Token inválido ou expirado');

    (jwtService.verifyAsync as jest.Mock).mockRejectedValue(mockError);

    const result = await validateJwtToken.execute(mockToken);

    expect(result).toEqual({
      valid: false,
      message: mockError.message,
    });
  });
});

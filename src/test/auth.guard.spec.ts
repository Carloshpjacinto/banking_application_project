/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ValidateJwtToken } from '../modules/auth/tools/validateJwtToken.tool';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import { User } from 'src/modules/user/entities/user.entity';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let validateJwtToken: ValidateJwtToken;
  let findUserByIdService: FindUserByIdService;

  const mockContext = (authHeader?: string): ExecutionContext =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: authHeader ? { authorization: authHeader } : {},
        }),
      }),
    }) as any;

  beforeEach(() => {
    validateJwtToken = {
      execute: jest.fn(),
    } as any;

    findUserByIdService = {
      execute: jest.fn(),
    } as any;

    guard = new AuthGuard(validateJwtToken, findUserByIdService);
  });

  it('should throw UnauthorizedException if no authorization header is present', async () => {
    await expect(guard.canActivate(mockContext())).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if authorization header is invalid', async () => {
    await expect(
      guard.canActivate(mockContext('InvalidTokenString')),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    (validateJwtToken.execute as jest.Mock).mockResolvedValue({ valid: false });

    await expect(
      guard.canActivate(mockContext('Bearer fake-token')),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return false if user is not found', async () => {
    (validateJwtToken.execute as jest.Mock).mockResolvedValue({
      valid: true,
      decoded: { sub: 1 },
    });
    (findUserByIdService.execute as jest.Mock).mockResolvedValue(null);

    const result = await guard.canActivate(mockContext('Bearer valid-token'));

    expect(result).toBe(false);
  });

  it('should attach user to request and return true if valid', async () => {
    const mockUser: User = {
      id: 1,
      name: 'Carlos',
      email: 'carlos@email.com',
      CPF: '123.456.789-00',
    };

    const request: any = {
      headers: { authorization: 'Bearer valid-token' },
    };

    const context: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as any;

    (validateJwtToken.execute as jest.Mock).mockResolvedValue({
      valid: true,
      decoded: { sub: 1 },
    });
    (findUserByIdService.execute as jest.Mock).mockResolvedValue(mockUser);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(request.user).toEqual(mockUser);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { LoginBankAccountAuthService } from '../services/loginBankAccountAuth.service';
import { FindBankAccountByAccountService } from 'src/modules/bankaccount/services/findBankAccountByAccount.service';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import { GenerateJwtToken } from '../tools/generateJwtToken.tool';
import { LoginBankAccountAuthDTO } from '../dto/login-bank-account-auth.dto';
import * as bcrypt from 'bcrypt';

describe('LoginBankAccountAuthService', () => {
  let service: LoginBankAccountAuthService;

  const findBankAccountByAccountService = { execute: jest.fn() };
  const findUserByIdService = { execute: jest.fn() };
  const generateJwtToken = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginBankAccountAuthService,
        {
          provide: FindBankAccountByAccountService,
          useValue: findBankAccountByAccountService,
        },
        { provide: FindUserByIdService, useValue: findUserByIdService },
        { provide: GenerateJwtToken, useValue: generateJwtToken },
      ],
    }).compile();

    service = module.get<LoginBankAccountAuthService>(
      LoginBankAccountAuthService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a token when login is successful', async () => {
    const body: LoginBankAccountAuthDTO = {
      num_account: '123456',
      access: 'valid-password',
    };

    const mockBankAccount = {
      access: await bcrypt.hash('valid-password', 10),
      user: { id: 1 },
    };

    const mockUser = { id: 1, name: 'Carlos' };
    const mockToken = 'jwt_token';

    findBankAccountByAccountService.execute.mockResolvedValue(mockBankAccount);
    findUserByIdService.execute.mockResolvedValue(mockUser);
    generateJwtToken.execute.mockReturnValue(mockToken);

    const result = await service.execute(body);

    expect(findBankAccountByAccountService.execute).toHaveBeenCalledWith(
      '123456',
    );
    expect(findUserByIdService.execute).toHaveBeenCalledWith(1);
    expect(generateJwtToken.execute).toHaveBeenCalledWith(mockUser);
    expect(result).toBe(mockToken);
  });

  it('should throw an error if account is not found', async () => {
    const body: LoginBankAccountAuthDTO = {
      num_account: '123456',
      access: 'some-password',
    };

    findBankAccountByAccountService.execute.mockResolvedValue(null);

    await expect(service.execute(body)).rejects.toThrow(
      'Erro ao fazer login na conta bancaria, tente novamente mais, Error: Error ao fazer login, tente novamente',
    );

    expect(findBankAccountByAccountService.execute).toHaveBeenCalledWith(
      '123456',
    );
  });

  it('should throw an error if access is invalid', async () => {
    const body: LoginBankAccountAuthDTO = {
      num_account: '123456',
      access: 'wrong-password',
    };

    const mockBankAccount = {
      access: await bcrypt.hash('valid-password', 10),
      user: { id: 1 },
    };

    findBankAccountByAccountService.execute.mockResolvedValue(mockBankAccount);

    await expect(service.execute(body)).rejects.toThrow(
      'Erro ao fazer login na conta bancaria, tente novamente mais, Error: Error ao fazer login, tente novamente',
    );
  });

  it('should throw an error if user is not found', async () => {
    const body: LoginBankAccountAuthDTO = {
      num_account: '123456',
      access: 'valid-password',
    };

    const mockBankAccount = {
      access: await bcrypt.hash('valid-password', 10),
      user: { id: 1 },
    };

    findBankAccountByAccountService.execute.mockResolvedValue(mockBankAccount);
    findUserByIdService.execute.mockResolvedValue(null);

    await expect(service.execute(body)).rejects.toThrow(
      'Erro ao fazer login na conta bancaria, tente novamente mais, Error: Conta não encontrado, tente novamente',
    );
  });
});

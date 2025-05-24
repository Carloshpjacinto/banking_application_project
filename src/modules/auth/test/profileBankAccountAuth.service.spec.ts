import { Test, TestingModule } from '@nestjs/testing';
import { ProfileBankAccountAuthService } from '../services/profileBankAccountAuth.service';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';

describe('ProfileBankAccountAuthService', () => {
  let service: ProfileBankAccountAuthService;

  const findBankAccountByUserIdService = { execute: jest.fn() };
  const findUserByIdService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileBankAccountAuthService,
        {
          provide: FindBankAccountByUserIdService,
          useValue: findBankAccountByUserIdService,
        },
        { provide: FindUserByIdService, useValue: findUserByIdService },
      ],
    }).compile();

    service = module.get<ProfileBankAccountAuthService>(
      ProfileBankAccountAuthService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user profile data with account data for current account', async () => {
    const userId = 1;

    const mockBankAccount = {
      userId: userId,
      agency: '0001',
      num_account: '123456',
      account_balance: 1000,
      credit: 500,
      special_check: 200,
      debit_account: 300,
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };

    const mockUser = {
      name: 'Carlos',
      email: 'carlos@example.com',
    };

    findBankAccountByUserIdService.execute.mockResolvedValue(mockBankAccount);
    findUserByIdService.execute.mockResolvedValue(mockUser);

    const result = await service.execute(userId);

    expect(findBankAccountByUserIdService.execute).toHaveBeenCalledWith(userId);
    expect(findUserByIdService.execute).toHaveBeenCalledWith(userId);

    expect(result).toEqual({
      name: 'Carlos',
      email: 'carlos@example.com',
      account_data: {
        agency: '0001',
        num_account: '123456',
        account_balance: 1000,
        credit: 500,
        special_check: 200,
        debit_account: 300,
        type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      },
    });
  });

  it('should include credit for savings account type', async () => {
    const userId = 2;

    const mockBankAccount = {
      userId: userId,
      agency: '0002',
      num_account: '654321',
      account_balance: 2000,
      credit: 800,
      special_check: 100,
      debit_account: 400,
      type_bank_account: TypeBankAccount.SAVINGS_ACCOUNT,
    };

    const mockUser = {
      name: 'Ana',
      email: 'ana@example.com',
    };

    findBankAccountByUserIdService.execute.mockResolvedValue(mockBankAccount);
    findUserByIdService.execute.mockResolvedValue(mockUser);

    const result = await service.execute(userId);

    expect(result.account_data.credit).toBe(800);
    expect(result.account_data.type_bank_account).toBe(
      TypeBankAccount.SAVINGS_ACCOUNT,
    );
  });

  it('should throw error if findBankAccountByUserIdService throws', async () => {
    const userId = 3;
    findBankAccountByUserIdService.execute.mockRejectedValue(
      new Error('DB error'),
    );

    await expect(service.execute(userId)).rejects.toThrow(
      /Erro ao encontrar conta bancaria, tente novamente mais tarde/,
    );
  });

  it('should throw error if findUserByIdService throws', async () => {
    const userId = 4;
    const mockBankAccount = {
      userId: userId,
      agency: '0003',
      num_account: '789012',
      account_balance: 500,
      credit: 200,
      special_check: 50,
      debit_account: 100,
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };

    findBankAccountByUserIdService.execute.mockResolvedValue(mockBankAccount);
    findUserByIdService.execute.mockRejectedValue(new Error('User not found'));

    await expect(service.execute(userId)).rejects.toThrow(
      /Erro ao encontrar conta bancaria, tente novamente mais tarde/,
    );
  });
});

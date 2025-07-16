/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { BANK_ACCOUNT_REPOSITORY } from 'src/shared/tokens/repositorieTokens';
import { CreateBankAccountService } from '../services/createBankAccount.service';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';
import { Repository } from 'typeorm';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';
import { User } from 'src/modules/user/entities/user.entity';

let service: CreateBankAccountService;
let bankAccountRepository: Partial<Repository<Bankaccount>>;

describe('CreateUserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBankAccountService,
        {
          provide: BANK_ACCOUNT_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateBankAccountService>(CreateBankAccountService);
    bankAccountRepository = module.get<Repository<Bankaccount>>(
      BANK_ACCOUNT_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a CURRENT_ACCOUNT type', async () => {
    const createDto: CreateBankaccountDto = {
      access: 'user-access-token',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };
    const userId = 1;

    const generatedAccountNumber = '8123-4';

    const partialAccount = {
      access: createDto.access,
      agency: '0001',
      num_account: expect.any(String),
      account_balance: '0',
      debit_account: '0',
      type_bank_account: createDto.type_bank_account,
      userId,
      credit: '500',
      special_check: '250',
    };

    const mockAccount = {
      id: 1,
      ...partialAccount,
      num_account: generatedAccountNumber,
      user: {
        id: 1,
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      } as User,
    };

    jest
      .spyOn(bankAccountRepository, 'create')
      .mockReturnValue(mockAccount as any);
    jest
      .spyOn(bankAccountRepository, 'save')
      .mockResolvedValue(mockAccount as any);

    const result = await service.execute(userId, createDto);

    expect(bankAccountRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(partialAccount),
    );

    expect(bankAccountRepository.save).toHaveBeenCalledWith(mockAccount);
    expect(result).toEqual(mockAccount);
  });

  it('should create a SAVINGS_ACCOUNT type', async () => {
    const createDto: CreateBankaccountDto = {
      access: 'user-access-token',
      type_bank_account: TypeBankAccount.SAVINGS_ACCOUNT,
    };
    const userId = 1;

    const generatedAccountNumber = '8123-4';

    const partialAccount = {
      access: createDto.access,
      agency: '0001',
      num_account: expect.any(String),
      account_balance: '0',
      debit_account: '0',
      type_bank_account: createDto.type_bank_account,
      userId,
      credit: '0',
      special_check: '250',
    };

    const mockAccount = {
      id: 1,
      ...partialAccount,
      num_account: generatedAccountNumber,
      user: {
        id: 1,
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      } as User,
    };

    jest
      .spyOn(bankAccountRepository, 'create')
      .mockReturnValue(mockAccount as any);
    jest
      .spyOn(bankAccountRepository, 'save')
      .mockResolvedValue(mockAccount as any);

    const result = await service.execute(userId, createDto);

    expect(bankAccountRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(partialAccount),
    );

    expect(bankAccountRepository.save).toHaveBeenCalledWith(mockAccount);
    expect(result).toEqual(mockAccount);
  });
});

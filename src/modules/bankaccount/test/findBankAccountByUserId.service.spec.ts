import { Test, TestingModule } from '@nestjs/testing';
import { FindBankAccountByUserIdService } from '../services/findBankAccountByUserId.service';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';
import { Repository } from 'typeorm';
import { BANK_ACCOUNT_REPOSITORY } from 'src/shared/tokens/repositorieTokens';
import { User } from 'src/modules/user/entities/user.entity';

let service: FindBankAccountByUserIdService;
let userRepository: Partial<Repository<Bankaccount>>;

const userMock: User = {
  id: 1,
  name: 'Carlos H P Jacinto',
  email: 'teste@teste.com',
  CPF: '12345678910',
};

const mockBankAccount: Bankaccount = {
  id: 1,
  access: '123456',
  agency: '0001',
  num_account: '1234-5',
  account_balance: '0',
  credit: '500',
  special_check: '250',
  debit_account: '0',
  type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
  userId: 1,
  user: userMock,
};

describe('FindbankAccountByUserIdService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindBankAccountByUserIdService,
        {
          provide: BANK_ACCOUNT_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindBankAccountByUserIdService>(
      FindBankAccountByUserIdService,
    );
    userRepository = module.get(BANK_ACCOUNT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a bank account by user id', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue(mockBankAccount);

    const result = await service.execute(mockBankAccount.userId);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { userId: mockBankAccount.userId },
      relations: ['user'],
    });

    expect(result).toEqual(mockBankAccount);
  });
});

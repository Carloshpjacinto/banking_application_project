import { Test, TestingModule } from '@nestjs/testing';
import { FindBankAccountByAccountService } from '../services/findBankAccountByAccount.service';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';
import { Repository } from 'typeorm';
import { BANK_ACCOUNT_REPOSITORY } from 'src/shared/tokens/repositorieTokens'; 
import { User } from 'src/modules/user/entities/user.entity';

let service: FindBankAccountByAccountService;
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

describe('FindUserByAccountService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindBankAccountByAccountService,
        {
          provide: BANK_ACCOUNT_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindBankAccountByAccountService>(
      FindBankAccountByAccountService,
    );
    userRepository = module.get(BANK_ACCOUNT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a bank account by account', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue(mockBankAccount);

    const result = await service.execute(mockBankAccount.num_account);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { num_account: mockBankAccount.num_account },
      relations: ['user'],
    });

    expect(result).toEqual(mockBankAccount);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BANK_ACCOUNT_REPOSITORY } from '../utils/repositoriesToken';
import { DebitUpdateValueBankAccountService } from '../services/debitUpdateValue.service';
import { Bankaccount } from '../entities/bankaccount.entity';
import { Repository } from 'typeorm';

let service: DebitUpdateValueBankAccountService;
let bankAccountRepository: Partial<Repository<Bankaccount>>;

const userId = 1;
const transfer_value = '150';

describe('CreditUpdateValueBankAccountService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DebitUpdateValueBankAccountService,
        {
          provide: BANK_ACCOUNT_REPOSITORY,
          useValue: {
            update: jest.fn().mockReturnValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<DebitUpdateValueBankAccountService>(
      DebitUpdateValueBankAccountService,
    );
    bankAccountRepository = module.get<Repository<Bankaccount>>(
      BANK_ACCOUNT_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should call update on bankAccountRepository with correct params', async () => {
    await service.execute(userId, transfer_value);

    expect(bankAccountRepository.update).toHaveBeenCalledWith(userId, {
      debit_account: transfer_value,
    });
  });
});

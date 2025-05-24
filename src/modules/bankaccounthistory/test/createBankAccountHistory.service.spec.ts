import { Test, TestingModule } from '@nestjs/testing';
import { CreateBankAccountHistoryService } from '../services/createBankAccountHistory.service';
import {
  Bankaccounthistory,
  Description,
  TransferType,
} from '../entities/BankAccountHistory.entity';
import { Repository } from 'typeorm';
import { BANK_ACCOUNT_HISTORY_REPOSITORY } from '../utils/repositoriesToken';

let service: CreateBankAccountHistoryService;
let bankAccountHistoryRepository: Repository<Bankaccounthistory>;

const createBankAccountHistoryMock: Bankaccounthistory = {
  id: 1,
  cpf_sender: '12345678910',
  cpf_recipient: '12345678910',
  transfer_type: TransferType.PIX_TRANSFER,
  description: Description.SENT,
  transfer_value: '150',
  date_transfer: new Date(),
};

describe('CreateBankAccountHistoryService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateBankAccountHistoryService,
        {
          provide: BANK_ACCOUNT_HISTORY_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateBankAccountHistoryService>(
      CreateBankAccountHistoryService,
    );
    bankAccountHistoryRepository = module.get<Repository<Bankaccounthistory>>(
      BANK_ACCOUNT_HISTORY_REPOSITORY,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a bank account history', async () => {
    const createSpy = jest
      .spyOn(bankAccountHistoryRepository, 'create')
      .mockReturnValue(createBankAccountHistoryMock);

    const saveSpy = jest
      .spyOn(bankAccountHistoryRepository, 'save')
      .mockResolvedValue(createBankAccountHistoryMock);

    const result = await service.execute(createBankAccountHistoryMock);

    expect(createSpy).toHaveBeenCalledWith(createBankAccountHistoryMock);
    expect(saveSpy).toHaveBeenCalledWith(createBankAccountHistoryMock);
    expect(result).toBe(true);
  });
});

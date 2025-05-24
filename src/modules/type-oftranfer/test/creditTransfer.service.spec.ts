import { Test, TestingModule } from '@nestjs/testing';
import { CreditTransferTransferService } from '../services/creditTransfer.service';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { DebitUpdateValueService } from 'src/modules/bankaccount/services/debitUpdateValue.service';
import { CreditUpdateValueService } from 'src/modules/bankaccount/services/creditUpdateValue.service';
import { SpecialCheckUpdateValueService } from 'src/modules/bankaccount/services/specialcheckUpdateValue.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import * as bcrypt from 'bcrypt';
import { TransferValueBankAccountAuthDTO } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import {
  Description,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

jest.mock('bcrypt');

describe('CreditTransferTransferService', () => {
  let service: CreditTransferTransferService;

  // mocks
  const findBankAccountByUserIdService = {
    execute: jest.fn(),
  };

  const debitUpdateValueService = {
    execute: jest.fn(),
  };

  const creditUpdateValueService = {
    execute: jest.fn(),
  };

  const specialCheckUpdateValueService = {
    execute: jest.fn(),
  };

  const balanceAccountUpdateValueService = {
    execute: jest.fn(),
  };

  const createBankAccountHistoryService = {
    execute: jest.fn(),
  };

  const findUserByCpfService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreditTransferTransferService,
        {
          provide: FindBankAccountByUserIdService,
          useValue: findBankAccountByUserIdService,
        },
        {
          provide: DebitUpdateValueService,
          useValue: debitUpdateValueService,
        },
        {
          provide: CreditUpdateValueService,
          useValue: creditUpdateValueService,
        },
        {
          provide: SpecialCheckUpdateValueService,
          useValue: specialCheckUpdateValueService,
        },
        {
          provide: BalanceAccountUpdateValueService,
          useValue: balanceAccountUpdateValueService,
        },
        {
          provide: CreateBankAccountHistoryService,
          useValue: createBankAccountHistoryService,
        },
        { provide: FindUserByCpfService, useValue: findUserByCpfService },
      ],
    }).compile();

    service = module.get<CreditTransferTransferService>(
      CreditTransferTransferService,
    );
  });

  it('should execute PIX transfer successfully', async () => {
    const userId = 1;
    const body: TransferValueBankAccountAuthDTO = {
      access: '010203',
      cpf_recipient: '12345678910',
      transfer_value: '100',
      type_transfer: TransferType.PIX_TRANSFER,
    };

    const senderBankAccount = {
      id: 1,
      credit: 500,
      debit_account: 0,
      access: 'hashed-password',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      user: { CPF: '12345678910' },
    };

    const recipient = {
      id: 2,
    };

    const recipientBankAccount = {
      id: 2,
      account_balance: 300,
    };

    findBankAccountByUserIdService.execute
      .mockResolvedValueOnce(senderBankAccount)
      .mockResolvedValueOnce(recipientBankAccount);

    findUserByCpfService.execute.mockResolvedValue(recipient);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await service.execute(userId, body);

    expect(findBankAccountByUserIdService.execute).toHaveBeenCalledTimes(2);
    expect(findUserByCpfService.execute).toHaveBeenCalledWith(
      body.cpf_recipient,
    );
    expect(creditUpdateValueService.execute).toHaveBeenCalled();
    expect(debitUpdateValueService.execute).toHaveBeenCalled();
    expect(createBankAccountHistoryService.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        transfer_type: TransferType.PIX_TRANSFER,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: body.cpf_recipient,
        transfer_value: body.transfer_value,
        description: Description.SENT,
      }),
    );
    expect(balanceAccountUpdateValueService.execute).toHaveBeenCalledWith(
      recipientBankAccount.id,
      expect.any(String),
    );
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { CreditTransferTransferService } from '../services/creditTransfer.service';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { DebitUpdateValueBankAccountService } from 'src/modules/bankaccount/services/debitUpdateValue.service';
import { CreditUpdateValueBankAccountService } from 'src/modules/bankaccount/services/creditUpdateValue.service';
import { SpecialCheckUpdateValueBankAccountService } from 'src/modules/bankaccount/services/specialcheckUpdateValueBankAccount.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import * as bcrypt from 'bcrypt';
import {
  TransferType,
  TransferValueBankAccountAuthDTO,
} from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

jest.mock('bcrypt');

describe('CreditTransferTransferService', () => {
  let service: CreditTransferTransferService;

  // mocks
  const findBankAccountByUserIdService = {
    execute: jest.fn(),
  };

  const debitUpdateValueBankAccountService = {
    execute: jest.fn(),
  };

  const creditUpdateValueBankAccountService = {
    execute: jest.fn(),
  };

  const specialCheckUpdateValueBankAccountService = {
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
          provide: DebitUpdateValueBankAccountService,
          useValue: debitUpdateValueBankAccountService,
        },
        {
          provide: CreditUpdateValueBankAccountService,
          useValue: creditUpdateValueBankAccountService,
        },
        {
          provide: SpecialCheckUpdateValueBankAccountService,
          useValue: specialCheckUpdateValueBankAccountService,
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
    // arrange
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

    // mocks
    findBankAccountByUserIdService.execute
      .mockResolvedValueOnce(senderBankAccount) // sender
      .mockResolvedValueOnce(recipientBankAccount); // recipient

    findUserByCpfService.execute.mockResolvedValue(recipient);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    // act
    await service.execute(userId, body);

    // assert
    expect(findBankAccountByUserIdService.execute).toHaveBeenCalledTimes(2);
    expect(findUserByCpfService.execute).toHaveBeenCalledWith(
      body.cpf_recipient,
    );
    expect(creditUpdateValueBankAccountService.execute).toHaveBeenCalled();
    expect(debitUpdateValueBankAccountService.execute).toHaveBeenCalled();
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

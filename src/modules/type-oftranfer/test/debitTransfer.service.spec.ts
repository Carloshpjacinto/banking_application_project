import { Test, TestingModule } from '@nestjs/testing';
import { DebitTransferTransferService } from '../services/debitTransfer.service';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { SpecialCheckUpdateValueBankAccountService } from 'src/modules/bankaccount/services/specialcheckUpdateValueBankAccount.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import {
  TransferType,
  TransferValueBankAccountAuthDTO,
} from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('DebitTransferTransferService', () => {
  let service: DebitTransferTransferService;

  const findBankAccountByUserIdService = {
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
        DebitTransferTransferService,
        {
          provide: FindBankAccountByUserIdService,
          useValue: findBankAccountByUserIdService,
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

    service = module.get<DebitTransferTransferService>(
      DebitTransferTransferService,
    );
  });

  it('should execute PIX transfer successfully when balance is enough', async () => {
    const userId = 1;
    const body: TransferValueBankAccountAuthDTO = {
      access: '010203',
      cpf_recipient: '12345678910',
      transfer_value: '100',
      type_transfer: TransferType.PIX_TRANSFER,
    };

    const senderBankAccount = {
      id: 1,
      access: 'hashed-password',
      account_balance: 300,
      special_check: 500,
      user: { CPF: '12345678910' },
    };

    const recipient = {
      id: 2,
    };

    const recipientBankAccount = {
      id: 2,
      account_balance: 200,
    };

    // mocks
    findBankAccountByUserIdService.execute
      .mockResolvedValueOnce(senderBankAccount) // sender
      .mockResolvedValueOnce(recipientBankAccount); // recipient

    findUserByCpfService.execute.mockResolvedValue(recipient);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await service.execute(userId, body);

    expect(findBankAccountByUserIdService.execute).toHaveBeenCalledTimes(2);
    expect(findUserByCpfService.execute).toHaveBeenCalledWith(
      body.cpf_recipient,
    );
    expect(balanceAccountUpdateValueService.execute).toHaveBeenCalledWith(
      senderBankAccount.id,
      expect.any(String),
    );
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

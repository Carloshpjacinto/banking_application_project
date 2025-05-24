import { Test, TestingModule } from '@nestjs/testing';
import { DepositTransferService } from '../services/depositTransfer.service';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { SpecialCheckUpdateValueService } from 'src/modules/bankaccount/services/specialcheckUpdateValue.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import * as bcrypt from 'bcrypt';
import { TransferValueBankAccountAuthDTO } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import {
  Description,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

jest.mock('bcrypt');

describe('DepositTransferService', () => {
  let service: DepositTransferService;

  const findBankAccountByUserIdService = { execute: jest.fn() };
  const balanceAccountUpdateValueService = { execute: jest.fn() };
  const specialCheckUpdateValueService = { execute: jest.fn() };
  const createBankAccountHistoryService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepositTransferService,
        {
          provide: FindBankAccountByUserIdService,
          useValue: findBankAccountByUserIdService,
        },
        {
          provide: BalanceAccountUpdateValueService,
          useValue: balanceAccountUpdateValueService,
        },
        {
          provide: SpecialCheckUpdateValueService,
          useValue: specialCheckUpdateValueService,
        },
        {
          provide: CreateBankAccountHistoryService,
          useValue: createBankAccountHistoryService,
        },
      ],
    }).compile();

    service = module.get<DepositTransferService>(DepositTransferService);
  });

  it('should perform a deposit without using special check', async () => {
    const userId = 1;
    const body: TransferValueBankAccountAuthDTO = {
      access: '010203',
      transfer_value: '150',
      cpf_recipient: '',
      type_transfer: TransferType.DEPOSIT,
    };

    const senderBankAccount = {
      id: 1,
      access: 'hashed-password',
      account_balance: 200,
      special_check: 300,
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      user: { CPF: '12345678910' },
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    findBankAccountByUserIdService.execute.mockResolvedValue(senderBankAccount);

    await service.execute(userId, body);

    expect(balanceAccountUpdateValueService.execute).toHaveBeenCalledWith(
      senderBankAccount.id,
      expect.any(String),
    );

    expect(createBankAccountHistoryService.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        transfer_type: TransferType.DEPOSIT,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: senderBankAccount.user.CPF,
        transfer_value: body.transfer_value,
        description: Description.DEPOSIT,
      }),
    );

    expect(specialCheckUpdateValueService.execute).not.toHaveBeenCalled();
  });

  it('should perform a deposit and update special check when below 125', async () => {
    const userId = 1;
    const body: TransferValueBankAccountAuthDTO = {
      access: '010203',
      transfer_value: '200',
      cpf_recipient: '',
      type_transfer: TransferType.DEPOSIT,
    };

    const senderBankAccount = {
      id: 1,
      access: '010203',
      account_balance: '500',
      special_check: '100',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      user: { CPF: '9876543210' },
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    findBankAccountByUserIdService.execute.mockResolvedValue(senderBankAccount);

    await service.execute(userId, body);

    expect(specialCheckUpdateValueService.execute).toHaveBeenCalledWith(
      senderBankAccount.id,
      expect.any(String),
    );

    expect(balanceAccountUpdateValueService.execute).toHaveBeenCalledWith(
      senderBankAccount.id,
      expect.any(String),
    );

    expect(createBankAccountHistoryService.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        transfer_type: TransferType.DEPOSIT,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: senderBankAccount.user.CPF,
        transfer_value: body.transfer_value,
        description: Description.DEPOSIT,
      }),
    );
  });
});

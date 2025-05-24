import { Test, TestingModule } from '@nestjs/testing';
import { TransferValueBankAccountAuthService } from '../services/transferValueBankAccountAuth.service';
import { DepositTransferService } from 'src/modules/type-oftranfer/services/depositTransfer.service';
import { DebitTransferTransferService } from 'src/modules/type-oftranfer/services/debitTransfer.service';
import { CreditTransferTransferService } from 'src/modules/type-oftranfer/services/creditTransfer.service';
import {
  FunctionTransfer,
  TransferValueBankAccountAuthDTO,
} from '../dto/transfer-value-bank-account-auth.dto';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

describe('TransferValueBankAccountAuthService', () => {
  let service: TransferValueBankAccountAuthService;

  const depositTransferService = { execute: jest.fn() };
  const debitTransferTransferService = { execute: jest.fn() };
  const creditTransferTransferService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferValueBankAccountAuthService,
        { provide: DepositTransferService, useValue: depositTransferService },
        {
          provide: DebitTransferTransferService,
          useValue: debitTransferTransferService,
        },
        {
          provide: CreditTransferTransferService,
          useValue: creditTransferTransferService,
        },
      ],
    }).compile();

    service = module.get<TransferValueBankAccountAuthService>(
      TransferValueBankAccountAuthService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should perform a deposit when type is DEPOSIT and no credit/debit function is set', async () => {
    const userId = 1;
    const body: TransferValueBankAccountAuthDTO = {
      type_transfer: TransferType.DEPOSIT,
      function_transfer: undefined,
      access: 'senha',
      transfer_value: '100',
      cpf_recipient: '',
    };

    await expect(service.execute(userId, body)).resolves.toEqual(
      'transferencia realizada com sucesso',
    );
    expect(depositTransferService.execute).toHaveBeenCalledWith(userId, body);
    expect(debitTransferTransferService.execute).not.toHaveBeenCalled();
    expect(creditTransferTransferService.execute).not.toHaveBeenCalled();
  });

  it('should perform a debit transfer when type is PIX_TRANSFER and function is TRANSFER_DEBIT', async () => {
    const userId = 2;
    const body: TransferValueBankAccountAuthDTO = {
      type_transfer: TransferType.PIX_TRANSFER,
      function_transfer: FunctionTransfer.TRANSFER_DEBIT,
      access: 'senha',
      transfer_value: '150',
      cpf_recipient: '12345678900',
    };

    await expect(service.execute(userId, body)).resolves.toEqual(
      'transferencia realizada com sucesso',
    );
    expect(debitTransferTransferService.execute).toHaveBeenCalledWith(
      userId,
      body,
    );
  });

  it('should perform a credit transfer when type is PIX_TRANSFER and function is TRANSFER_CREDIT', async () => {
    const userId = 3;
    const body: TransferValueBankAccountAuthDTO = {
      type_transfer: TransferType.PIX_TRANSFER,
      function_transfer: FunctionTransfer.TRANSFER_CREDIT,
      access: 'senha',
      transfer_value: '200',
      cpf_recipient: '98765432100',
    };

    await expect(service.execute(userId, body)).resolves.toEqual(
      'transferencia realizada com sucesso',
    );
    expect(creditTransferTransferService.execute).toHaveBeenCalledWith(
      userId,
      body,
    );
  });

  it('should throw an error if the combination of transfer type and function is invalid', async () => {
    const userId = 4;
    const body: TransferValueBankAccountAuthDTO = {
      type_transfer: TransferType.DEPOSIT,
      function_transfer: FunctionTransfer.TRANSFER_CREDIT,
      access: 'senha',
      transfer_value: '300',
      cpf_recipient: '',
    };

    await expect(service.execute(userId, body)).rejects.toThrow(
      'Erro ao realizar transação bancaria, tente novamente mais',
    );

    expect(depositTransferService.execute).not.toHaveBeenCalled();
    expect(debitTransferTransferService.execute).not.toHaveBeenCalled();
    expect(creditTransferTransferService.execute).not.toHaveBeenCalled();
  });
});

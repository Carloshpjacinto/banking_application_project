import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controller/auth.controller';
import { CreateUserService } from 'src/modules/user/services/createUser.service';
import { CreateBankAccountService } from 'src/modules/bankaccount/services/createBankAccount.service';
import { LoginBankAccountAuthService } from '../services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from '../services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthService } from '../services/transferValueBankAccountAuth.service';
import { FindBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/findBankAccountHistory.service';
import {
  Description,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import { FunctionTransfer } from '../dto/transfer-value-bank-account-auth.dto';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/shared/guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  // Mocks
  const mockCreateUserService = { execute: jest.fn() };
  const mockCreateBankAccountService = { execute: jest.fn() };
  const mockLoginBankAccountAuthService = { execute: jest.fn() };
  const mockProfileBankAccountAuthService = { execute: jest.fn() };
  const mockTransferValueBankAccountAuthService = { execute: jest.fn() };
  const mockFindBankAccountHistoryService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: CreateUserService, useValue: mockCreateUserService },
        {
          provide: CreateBankAccountService,
          useValue: mockCreateBankAccountService,
        },
        {
          provide: LoginBankAccountAuthService,
          useValue: mockLoginBankAccountAuthService,
        },
        {
          provide: ProfileBankAccountAuthService,
          useValue: mockProfileBankAccountAuthService,
        },
        {
          provide: TransferValueBankAccountAuthService,
          useValue: mockTransferValueBankAccountAuthService,
        },
        {
          provide: FindBankAccountHistoryService,
          useValue: mockFindBankAccountHistoryService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // 🚀 Testes

  it('should register a user', async () => {
    const dto = {
      name: 'Carlos',
      email: 'carlos@email.com',
      password: '123456',
      CPF: '12345678900',
    };
    mockCreateUserService.execute.mockResolvedValue('user_created');

    const result = await controller.registerUser(dto);

    expect(mockCreateUserService.execute).toHaveBeenCalledWith(dto);
    expect(result).toBe('user_created');
  });

  it('should register a bank account', async () => {
    const userId = 1;
    const dto = {
      access: '1234',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };
    mockCreateBankAccountService.execute.mockResolvedValue(
      'bank_account_created',
    );

    const result = await controller.registerBankAccount(userId, dto);

    expect(mockCreateBankAccountService.execute).toHaveBeenCalledWith(
      userId,
      dto,
    );
    expect(result).toBe('bank_account_created');
  });

  it('should login', async () => {
    const dto = {
      access: '1234',
      password: 'senha',
      num_account: '987654',
    };
    mockLoginBankAccountAuthService.execute.mockResolvedValue('token');

    const result = await controller.login(dto);

    expect(mockLoginBankAccountAuthService.execute).toHaveBeenCalledWith(dto);
    expect(result).toBe('token');
  });

  it('should get user profile', async () => {
    const userId = 1;
    mockProfileBankAccountAuthService.execute.mockResolvedValue('profile_data');

    const result = await controller.profile(userId);

    expect(mockProfileBankAccountAuthService.execute).toHaveBeenCalledWith(
      userId,
    );
    expect(result).toBe('profile_data');
  });

  it('should transfer value', async () => {
    const userId = 1;
    const dto = {
      type_transfer: TransferType.PIX_TRANSFER,
      cpf_recipient: '98765432100',
      function_transfer: FunctionTransfer.TRANSFER_CREDIT,
      transfer_value: '100',
      access: '5678',
    };
    mockTransferValueBankAccountAuthService.execute.mockResolvedValue(
      'transfer_done',
    );

    const result = await controller.transfer(userId, dto);

    expect(
      mockTransferValueBankAccountAuthService.execute,
    ).toHaveBeenCalledWith(userId, dto);
    expect(result).toBe('transfer_done');
  });

  it('should get bank account history', async () => {
    const cpf = '12345678900';
    const description: Description = Description.SENT;
    mockFindBankAccountHistoryService.execute.mockResolvedValue('history');

    const result = await controller.getHistory(cpf, description);

    expect(mockFindBankAccountHistoryService.execute).toHaveBeenCalledWith(
      cpf,
      description,
    );
    expect(result).toBe('history');
  });
});

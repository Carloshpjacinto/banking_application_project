/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controller/auth.controller';
import { RegisterUserAuthService } from '../services/registerUserAuth.service';
import { RegisterBankAccountAuthService } from '../services/registerBankAccountAuth.service';
import { LoginBankAccountAuthService } from '../services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from '../services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthService } from '../services/transferValueBankAccountAuth.service';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import {
  FunctionTransfer,
  TransferType,
} from '../dto/transfer-value-bank-account-auth.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';

describe('AuthController', () => {
  let authController: AuthController;

  // Mocks dos serviços
  const mockRegisterUserAuthService = { execute: jest.fn() };
  const mockRegisterBankAccountAuthService = { execute: jest.fn() };
  const mockLoginBankAccountAuthService = { execute: jest.fn() };
  const mockProfileBankAccountAuthService = { execute: jest.fn() };
  const mockTransferValueBankAccountAuthService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RegisterUserAuthService,
          useValue: mockRegisterUserAuthService,
        },
        {
          provide: RegisterBankAccountAuthService,
          useValue: mockRegisterBankAccountAuthService,
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
      ],
    })
      .overrideGuard(AuthGuard) // <-- Adicione isso
      .useValue({ canActivate: () => true }) // Mock simples que permite todos os acessos
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should call RegisterUserAuthService.execute with correct params', async () => {
      const dto = {
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      };
      mockRegisterUserAuthService.execute.mockResolvedValue('user_registered');

      const result = await authController.registerUser(dto);

      expect(mockRegisterUserAuthService.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe('user_registered');
    });
  });

  describe('registerBankAccount', () => {
    it('should call RegisterBankAccountAuthService.execute with userId and dto', async () => {
      const req = { user: { id: 1 } } as any;
      const dto = {
        access: '010203',
        type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      };
      mockRegisterBankAccountAuthService.execute.mockResolvedValue(
        'bank_account_registered',
      );

      const result = await authController.registerBankAccount(req, dto);

      expect(mockRegisterBankAccountAuthService.execute).toHaveBeenCalledWith(
        1,
        dto,
      );
      expect(result).toBe('bank_account_registered');
    });
  });

  describe('login', () => {
    it('should call LoginBankAccountAuthService.execute with correct params', async () => {
      const dto = { num_account: '1234-5', access: '123456' };
      mockLoginBankAccountAuthService.execute.mockResolvedValue('token');

      const result = await authController.login(dto);

      expect(mockLoginBankAccountAuthService.execute).toHaveBeenCalledWith(dto);
      expect(result).toBe('token');
    });
  });

  describe('profile', () => {
    it('should call ProfileBankAccountAuthService.execute with userId', async () => {
      mockProfileBankAccountAuthService.execute.mockResolvedValue(
        'profile_data',
      );

      const result = await authController.profile(1);

      expect(mockProfileBankAccountAuthService.execute).toHaveBeenCalledWith(1);
      expect(result).toBe('profile_data');
    });
  });

  describe('transferencia', () => {
    it('should call TransferValueBankAccountAuthService.execute with userId and dto', async () => {
      const dto = {
        type_transfer: TransferType.PIX_TRANSFER,
        cpf_recipient: '12345678910',
        function_transfer: FunctionTransfer.TRANSFER_DEBIT,
        transfer_value: '150',
        access: '010203',
      };
      mockTransferValueBankAccountAuthService.execute.mockResolvedValue(
        'transfer_success',
      );

      const result = await authController.transferencia(1, dto);

      expect(
        mockTransferValueBankAccountAuthService.execute,
      ).toHaveBeenCalledWith(1, dto);
      expect(result).toBe('transfer_success');
    });
  });
});

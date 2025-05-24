/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterBankAccountAuthService } from '../services/registerBankAccountAuth.service';
import { CreateBankAccountService } from 'src/modules/bankaccount/services/createBankAccount.service';
import { FindBankAccountByAccessService } from 'src/modules/bankaccount/services/findBankAccountByAccess.service';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import * as validateModule from '../tools/validateExistingUser.tool';
import * as hashModule from 'src/shared/tools/hashData.tool';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';

describe('RegisterBankAccountAuthService', () => {
  let service: RegisterBankAccountAuthService;
  let createBankAccountService: CreateBankAccountService;
  let findBankAccountByAccessService: FindBankAccountByAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterBankAccountAuthService,
        {
          provide: CreateBankAccountService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindBankAccountByAccessService,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RegisterBankAccountAuthService>(
      RegisterBankAccountAuthService,
    );
    createBankAccountService = module.get<CreateBankAccountService>(
      CreateBankAccountService,
    );
    findBankAccountByAccessService = module.get<FindBankAccountByAccessService>(
      FindBankAccountByAccessService,
    );
  });

  it('should create a bank account successfully', async () => {
    const userId = 1;
    const dto: CreateBankAccountAuthDto = {
      access: '010203',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };

    jest
      .spyOn(findBankAccountByAccessService, 'execute')
      .mockResolvedValue(null);

    jest.spyOn(validateModule, 'validateExisting').mockImplementation(() => {});

    jest.spyOn(hashModule, 'hashData').mockResolvedValue('hashedAccess');

    const fakeBankAccount = {
      id: 1,
      userId,
      access: 'hashedAccess',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      agency: '0001',
      num_account: '1234-5',
      account_balance: '1000',
      credit: '500',
      special_check: '200',
      debit_account: '300',
      user: {
        id: userId,
        CPF: '12345678900',
        name: 'Teste',
        email: 'teste@email.com',
      },
    };
    jest
      .spyOn(createBankAccountService, 'execute')
      .mockResolvedValue(fakeBankAccount);

    const result = await service.execute(userId, dto);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: expect.any(Number),
        type_bank_account: expect.any(String),
        agency: expect.any(String),
        num_account: expect.any(String),
        account_balance: expect.any(String),
        credit: expect.any(String),
        special_check: expect.any(String),
        debit_account: expect.any(String),
        user: expect.objectContaining({
          id: expect.any(Number),
          CPF: expect.any(String),
        }),
      }),
    );

    expect(result).not.toHaveProperty('access');

    expect(findBankAccountByAccessService.execute).toHaveBeenCalledWith(
      '010203',
    );
    expect(validateModule.validateExisting).toHaveBeenCalledWith({
      bankAccount: null,
      createBank: dto,
    });
    expect(hashModule.hashData).toHaveBeenCalledWith('010203');
    expect(createBankAccountService.execute).toHaveBeenCalledWith(userId, {
      ...dto,
      access: 'hashedAccess',
    });
  });
});

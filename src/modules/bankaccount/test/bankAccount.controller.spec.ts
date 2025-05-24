/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountController } from '../controller/bankAccount.controller';
import { CreateBankAccountService } from '../services/createBankAccount.service';
import { FindBankAccountByAccountService } from '../services/findBankAccountByAccount.service';
import { FindBankAccountByUserIdService } from '../services/findBankAccountByUserId.service';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';

describe('BankAccountController', () => {
  let controller: BankAccountController;
  let createService: CreateBankAccountService;
  let findByAccountService: FindBankAccountByAccountService;
  let findByUserIdService: FindBankAccountByUserIdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountController],
      providers: [
        {
          provide: CreateBankAccountService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindBankAccountByAccountService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindBankAccountByUserIdService,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<BankAccountController>(BankAccountController);
    createService = module.get<CreateBankAccountService>(
      CreateBankAccountService,
    );
    findByAccountService = module.get<FindBankAccountByAccountService>(
      FindBankAccountByAccountService,
    );
    findByUserIdService = module.get<FindBankAccountByUserIdService>(
      FindBankAccountByUserIdService,
    );
  });

  it('should create a bank account', async () => {
    const userId = 1;
    const dto: CreateBankaccountDto = {
      access: '123456',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
    };
    const result: Bankaccount = {
      id: 1,
      access: '123456',
      agency: '0001',
      num_account: '1234567890',
      account_balance: '1000.00',
      credit: '500.00',
      special_check: '0.00',
      debit_account: '100.00',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      userId: 1,
      user: {
        id: 1,
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      },
    };

    jest.spyOn(createService, 'execute').mockResolvedValue(result);

    const response = await controller.create(userId, dto);
    expect(response).toEqual(result);
    expect(createService.execute).toHaveBeenCalledWith(userId, dto);
  });

  it('should find a bank account by account number', async () => {
    const num_account = '123456';
    const result: Bankaccount = {
      id: 1,
      access: '123456',
      agency: '0001',
      num_account: '1234567890',
      account_balance: '1000.00',
      credit: '500.00',
      special_check: '0.00',
      debit_account: '100.00',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      userId: 1,
      user: {
        id: 1,
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      },
    };

    jest.spyOn(findByAccountService, 'execute').mockResolvedValue(result);

    const response = await controller.findBankAccountByAccount(num_account);
    expect(response).toEqual(result);
    expect(findByAccountService.execute).toHaveBeenCalledWith(num_account);
  });

  it('should find a bank account by user id', async () => {
    const userId = 1;

    const result: Bankaccount = {
      id: 1,
      access: '123456',
      agency: '0001',
      num_account: '1234567890',
      account_balance: '1000.00',
      credit: '500.00',
      special_check: '0.00',
      debit_account: '100.00',
      type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
      userId: 1,
      user: {
        id: 1,
        name: 'Carlos H P Jacinto',
        email: 'teste@teste.com',
        CPF: '12345678910',
      },
    };

    jest.spyOn(findByUserIdService, 'execute').mockResolvedValue(result);

    const response = await controller.findUserById(userId);
    expect(response).toEqual(result);
    expect(findByUserIdService.execute).toHaveBeenCalledWith(userId);
  });
});

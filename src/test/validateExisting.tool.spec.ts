import {
  Bankaccount,
  TypeBankAccount,
} from 'src/modules/bankaccount/entities/bankaccount.entity';
import { validateExisting } from 'src/modules/auth/tools/validateExistingUser.tool';
import { BadRequestException } from '@nestjs/common';

describe('validateExisting', () => {
  const existingUser = {
    id: 1,
    CPF: '12345678900',
    email: 'test@example.com',
    name: 'Test User',
  };

  const newUser = {
    CPF: '98765432100',
    email: 'new@example.com',
    name: 'New User',
  };

  const existingBankAccount: Bankaccount = {
    id: 1,
    access: 'account123',
    agency: '0001',
    num_account: '123456789',
    account_balance: '1000.00',
    credit: '500.00',
    special_check: '200.00',
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

  const newBankAccount = {
    access: '010203',
    type_bank_account: TypeBankAccount.CURRENT_ACCOUNT,
  };

  it('should throw BadRequestException if user CPF matches', () => {
    expect(() =>
      validateExisting({
        user: existingUser,
        createUser: { ...newUser, CPF: existingUser.CPF },
      }),
    ).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user email matches', () => {
    expect(() =>
      validateExisting({
        user: existingUser,
        createUser: { ...newUser, email: existingUser.email },
      }),
    ).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user name matches', () => {
    expect(() =>
      validateExisting({
        user: existingUser,
        createUser: { ...newUser, name: existingUser.name },
      }),
    ).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if bank account access matches', () => {
    expect(() =>
      validateExisting({
        bankAccount: existingBankAccount,
        createBank: { ...newBankAccount, access: existingBankAccount.access },
      }),
    ).toThrow(BadRequestException);
  });

  it('should NOT throw if user and createUser are null or do not conflict', () => {
    expect(() =>
      validateExisting({ user: existingUser, createUser: newUser }),
    ).not.toThrow();
  });

  it('should NOT throw if bankAccount and createBank are null or do not conflict', () => {
    expect(() =>
      validateExisting({
        bankAccount: existingBankAccount,
        createBank: newBankAccount,
      }),
    ).not.toThrow();
  });

  it('should NOT throw if all parameters are null', () => {
    expect(() =>
      validateExisting({
        user: null,
        createUser: null,
        bankAccount: null,
        createBank: null,
      }),
    ).not.toThrow();
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';
import { FindBankAccountByAccessService } from './findBankAccountByAccess.service';
import { validateExisting } from 'src/shared/tools/validateExistingUser.tool';
import { hashData } from 'src/shared/tools/hashData.tool';

@Injectable()
export class CreateBankAccountService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
    private readonly findBankAccountByAccessService: FindBankAccountByAccessService,
  ) {}
  async execute(
    userId: number,
    body: CreateBankaccountDto,
  ): Promise<Bankaccount> {
    try {
      const account_number = `81${Math.floor(Math.random() * 79 + 10)}-${Math.floor(Math.random() * 9 + 1)}`;

      if (!body.access) throw new Error(`Erro ao criar conta bancária`);

      const existingBank = await this.findBankAccountByAccessService.execute(
        body.access,
      );

      validateExisting({ bankAccount: existingBank, createBank: body });

      body.access = await hashData(body.access);

      let newBankAccount: Bankaccount;

      const baseData = {
        access: body.access,
        agency: '0001',
        num_account: account_number,
        account_balance: '0',
        debit_account: '0',
        type_bank_account: body.type_bank_account,
        userId: userId,
      };

      if (body.type_bank_account === TypeBankAccount.CURRENT_ACCOUNT) {
        newBankAccount = this.bankAccountRepository.create({
          ...baseData,
          credit: '500',
          special_check: '250',
        });
      } else if (body.type_bank_account === TypeBankAccount.SAVINGS_ACCOUNT) {
        newBankAccount = this.bankAccountRepository.create({
          ...baseData,
          credit: '0',
          special_check: '250',
        });
      } else {
        throw new Error('Tipo de conta bancária inválido.');
      }

      await this.bankAccountRepository.save(newBankAccount);

      const { access, ...rest } = newBankAccount;

      return rest;
    } catch (err) {
      throw new Error(`Erro ao criar conta bancária: ${err}`);
    }
  }
}

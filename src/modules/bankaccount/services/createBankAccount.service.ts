import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';
import {
  CreateBankaccountDto,
  TypeBankAccount,
} from '../dto/create-bankaccount.dto';

@Injectable()
export class CreateBankAccountService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(
    userId: number,
    body: CreateBankaccountDto,
  ): Promise<Bankaccount> {
    try {
      const account_number = `81${Math.floor(Math.random() * 79 + 10)}-${Math.floor(Math.random() * 9 + 1)}`;

      let newBankAccount: Bankaccount;

      const baseData = {
        access: body.access,
        agency: '0001',
        num_account: account_number,
        debit: '0',
        userId: userId,
        type_bank_account: body.type_bank_account,
      };

      if (body.type_bank_account === TypeBankAccount.CREDIT) {
        newBankAccount = this.bankAccountRepository.create({
          ...baseData,
          credit: '250',
          special_check: '125',
        });
      } else if (body.type_bank_account === TypeBankAccount.CURRENT) {
        newBankAccount = this.bankAccountRepository.create({
          ...baseData,
          credit: '0',
          special_check: '250',
        });
      } else {
        throw new Error('Tipo de conta bancária inválido.');
      }

      await this.bankAccountRepository.save(newBankAccount);
      return newBankAccount;
    } catch (err) {
      throw new Error(`Erro ao criar conta bancária: ${err}`);
    }
  }
}

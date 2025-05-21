import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount, TypeBankAccount } from '../entities/bankaccount.entity';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';

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
          special_check: '0',
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

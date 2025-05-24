import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class FindBankAccountByAccountService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(num_account: string): Promise<Bankaccount> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { num_account: num_account },
      relations: ['user'],
    });

    if (!bankAccount) throw new Error(`Conta não encontrado`);

    return bankAccount;
  }
}

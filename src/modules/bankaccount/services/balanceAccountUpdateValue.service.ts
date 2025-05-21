import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class BalanceAccountUpdateValueService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(userId: number, trans_value: string): Promise<string> {
    await this.bankAccountRepository.update(userId, {
      account_balance: trans_value,
    });

    return 'Valor transferido com sucesso!';
  }
}

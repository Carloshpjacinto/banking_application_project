import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class SpecialCheckUpdateValueBankAccountService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(userId: number, trans_value: string): Promise<string> {
    await this.bankAccountRepository.update(userId, {
      special_check: trans_value,
    });

    return 'Valor transferido com sucesso!';
  }
}

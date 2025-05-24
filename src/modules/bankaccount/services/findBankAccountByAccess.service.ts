import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class FindBankAccountByAccessService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(access: string): Promise<Bankaccount | null> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { access: access },
    });

    return bankAccount;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class FindBankAccountByUserIdService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(userId: number): Promise<Bankaccount> {
    const bankAccount = await this.bankAccountRepository.findOne({
      where: { userId: userId },
      relations: ['user'],
    });

    if (!bankAccount) throw new Error(`Conta não encontrado`);

    return bankAccount;
  }
}

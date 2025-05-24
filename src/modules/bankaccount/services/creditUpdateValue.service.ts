import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';

@Injectable()
export class CreditUpdateValueService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(userId: number, trans_value: string): Promise<string> {
    await this.bankAccountRepository.update(userId, { credit: trans_value });

    return 'Valor transferido com sucesso!';
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccount } from '../entities/bankaccount.entity';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';

@Injectable()
export class CreateBankAccountService {
  constructor(
    @Inject('BANK_ACCOUNT_REPOSITORY')
    private readonly bankAccountRepository: Repository<Bankaccount>,
  ) {}
  async execute(body: CreateBankaccountDto): Promise<Bankaccount> {
    const account_number = `81${Math.floor(Math.random() * 79) + 10}-${Math.floor(Math.random() * 9) + 1}`;

    const NewbankAccount = this.bankAccountRepository.create({
      access: body.access,

      agency: '0001',

      num_account: account_number,

      debit: '500',

      userId: 1,
    });

    await this.bankAccountRepository.save(NewbankAccount);

    return NewbankAccount;
  }
}

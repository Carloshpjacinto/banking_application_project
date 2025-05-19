import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Bankaccounthistory } from '../entities/BankAccountHistory.entity';
import { CreateBankaccounthistoryDto } from '../dto/create-bankaccounthistory.dto';

@Injectable()
export class CreateBankAccountHistoryService {
  constructor(
    @Inject('BANK_ACCOUNT_HISTORY_REPOSITORY')
    private readonly bankAccountHistoryRepository: Repository<Bankaccounthistory>,
  ) {}
  async execute(body: CreateBankaccounthistoryDto): Promise<boolean> {
    const bankAccountHistory = this.bankAccountHistoryRepository.create(body);

    await this.bankAccountHistoryRepository.save(bankAccountHistory);

    return true;
  }
}

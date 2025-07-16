import { Module } from '@nestjs/common';
import { CreateBankAccountHistoryService } from './services/createBankAccountHistory.service';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountHistoryProviders } from './bankaccounthistory.providers';
import { FindBankAccountHistoryService } from './services/findBankAccountHistory.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...bankAccountHistoryProviders,
    FindBankAccountHistoryService,
    CreateBankAccountHistoryService,
  ],
  exports: [CreateBankAccountHistoryService, FindBankAccountHistoryService],
})
export class BankaccounthistoryModule {}

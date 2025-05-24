import { Module } from '@nestjs/common';
import { CreateBankAccountHistoryService } from './services/createBankAccountHistory.service';
import { BankAccountHistoryController } from './controller/bankAccountHistory.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountHistoryProviders } from './bankaccounthistory.providers';
import { FindBankAccountHistoryService } from './services/findBankAccountHistory.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountHistoryController],
  providers: [
    ...bankAccountHistoryProviders,
    FindBankAccountHistoryService,
    CreateBankAccountHistoryService,
  ],
  exports: [CreateBankAccountHistoryService, FindBankAccountHistoryService],
})
export class BankaccounthistoryModule {}

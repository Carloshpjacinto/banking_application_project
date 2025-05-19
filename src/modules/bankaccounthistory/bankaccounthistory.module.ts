import { Module } from '@nestjs/common';
import { CreateBankAccountHistoryService } from './services/createBankAccountHistory.service';
import { BankAccountHistoryController } from './controller/bankAccountHistory.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountHistoryProviders } from './bankaccounthistory.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountHistoryController],
  providers: [CreateBankAccountHistoryService, ...bankAccountHistoryProviders],
})
export class BankaccounthistoryModule {}

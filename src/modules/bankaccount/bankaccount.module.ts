import { Module } from '@nestjs/common';
import { CreateBankAccountService } from './services/createBankAccount';
import { BankAccountController } from './controller/bankAccount.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountProviders } from './bankAccount.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountController],
  providers: [CreateBankAccountService, ...bankAccountProviders],
})
export class BankaccountModule {}

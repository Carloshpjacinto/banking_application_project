import { Module } from '@nestjs/common';
import { CreateBankAccountService } from './services/createBankAccount.service';
import { BankAccountController } from './controller/bankAccount.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountProviders } from './bankAccount.providers';
import { FindBankAccountByAccountService } from './services/findBankAccountByAccount.service';
import { FindBankAccountByUserIdService } from './services/findBankAccountByUserId.service';
import { FindBankAccountByAccessService } from './services/findBankAccountByAccess.service';
import { DebitUpdateValueBankAccountService } from './services/debitUpdateValue.service';
import { CreditUpdateValueBankAccountService } from './services/creditUpdateValue.service';
import { SpecialCheckUpdateValueBankAccountService } from './services/specialcheckUpdateValueBankAccount.service';
import { BalanceAccountUpdateValueService } from './services/balanceAccountUpdateValue.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BankAccountController],
  providers: [
    ...bankAccountProviders,
    CreateBankAccountService,
    FindBankAccountByAccountService,
    FindBankAccountByUserIdService,
    FindBankAccountByAccessService,
    DebitUpdateValueBankAccountService,
    CreditUpdateValueBankAccountService,
    SpecialCheckUpdateValueBankAccountService,
    BalanceAccountUpdateValueService,
  ],
  exports: [
    CreateBankAccountService,
    FindBankAccountByAccessService,
    FindBankAccountByAccountService,
    FindBankAccountByUserIdService,
    DebitUpdateValueBankAccountService,
    CreditUpdateValueBankAccountService,
    SpecialCheckUpdateValueBankAccountService,
    BalanceAccountUpdateValueService,
  ],
})
export class BankaccountModule {}

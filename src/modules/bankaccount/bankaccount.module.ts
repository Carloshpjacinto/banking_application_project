import { Module } from '@nestjs/common';
import { CreateBankAccountService } from './services/createBankAccount.service';
import { BankAccountController } from './controller/bankAccount.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountProviders } from './bankAccount.providers';
import { FindBankAccountByAccountService } from './services/findBankAccountByAccount.service';
import { FindBankAccountByUserIdService } from './services/findBankAccountByUserId.service';
import { FindBankAccountByAccessService } from './services/findBankAccountByAccess.service';
import { DebitUpdateValueService } from './services/debitUpdateValue.service';
import { CreditUpdateValueService } from './services/creditUpdateValue.service';
import { SpecialCheckUpdateValueService } from './services/specialcheckUpdateValue.service';
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
    DebitUpdateValueService,
    CreditUpdateValueService,
    SpecialCheckUpdateValueService,
    BalanceAccountUpdateValueService,
  ],
  exports: [
    CreateBankAccountService,
    FindBankAccountByAccessService,
    FindBankAccountByAccountService,
    FindBankAccountByUserIdService,
    DebitUpdateValueService,
    CreditUpdateValueService,
    SpecialCheckUpdateValueService,
    BalanceAccountUpdateValueService,
  ],
})
export class BankaccountModule {}

import { forwardRef, Module } from '@nestjs/common';
import { CreateBankAccountService } from './services/createBankAccount.service';
import { BankAccountController } from './controller/bankAccount.controller';
import { DatabaseModule } from 'src/database/database.module';
import { bankAccountProviders } from './bankAccount.providers';
import { FindBankAccountByAccountService } from './services/findBankAccountByAccount.service';
import { FindBankAccountByUserIdService } from './services/findBankAccountByUserId.service';
import { AuthModule } from '../auth/auth.module';
import { FindBankAccountByAccessService } from './services/findBankAccountByAccess.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [BankAccountController],
  providers: [
    ...bankAccountProviders,
    CreateBankAccountService,
    FindBankAccountByAccountService,
    FindBankAccountByUserIdService,
    FindBankAccountByAccessService,
  ],
  exports: [CreateBankAccountService, FindBankAccountByAccessService],
})
export class BankaccountModule {}

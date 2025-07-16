import { forwardRef, Module } from '@nestjs/common';
import { DepositTransferService } from './services/depositTransfer.service';
import { UserModule } from '../user/user.module';
import { BankaccountModule } from '../bankaccount/bankaccount.module';
import { BankaccounthistoryModule } from '../bankaccounthistory/bankaccounthistory.module';
import { DebitTransferTransferService } from './services/debitTransfer.service';
import { CreditTransferTransferService } from './services/creditTransfer.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => BankaccountModule),
    forwardRef(() => BankaccounthistoryModule),
  ],
  providers: [
    DepositTransferService,
    DebitTransferTransferService,
    CreditTransferTransferService,
  ],
  exports: [
    DepositTransferService,
    DebitTransferTransferService,
    CreditTransferTransferService,
  ],
})
export class TypeOftranferModule {}

import { forwardRef, Module } from '@nestjs/common';
import { DepositTransferService } from './services/DepositTransfer.service';
import { UserModule } from '../user/user.module';
import { BankaccountModule } from '../bankaccount/bankaccount.module';
import { BankaccounthistoryModule } from '../bankaccounthistory/bankaccounthistory.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => BankaccountModule),
    forwardRef(() => BankaccounthistoryModule),
  ],
  providers: [DepositTransferService],
  exports: [DepositTransferService],
})
export class TypeOftranferModule {}

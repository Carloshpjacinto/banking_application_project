import { Injectable } from '@nestjs/common';
import { DepositTransferService } from 'src/modules/type-oftranfer/services/depositTransfer.service';
import { TransferValueBankAccountAuthDTO } from '../dto/transfer-value-bank-account-auth.dto';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { DebitTransferTransferService } from 'src/modules/type-oftranfer/services/debitTransfer.service';
import { CreditTransferTransferService } from 'src/modules/type-oftranfer/services/creditTransfer.service';

@Injectable()
export class TransferValueBankAccountAuthService {
  constructor(
    private readonly depositTransferService: DepositTransferService,
    private readonly debitTransferTransferService: DebitTransferTransferService,
    private readonly creditTransferTransferService: CreditTransferTransferService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    if (body.type_transfer == TransferType.DEPOSIT) {
      await this.depositTransferService.execute(userId, body);

      return 'transferencia realizada com sucesso';
    } else if (body.type_transfer == TransferType.DEBIT_TRANSFER) {
      await this.debitTransferTransferService.execute(userId, body);

      return 'transferencia realizada com sucesso';
    } else if (body.type_transfer == TransferType.CREDIT_TRANSFER) {
      await this.creditTransferTransferService.execute(userId, body);

      return 'transferencia realizada com sucesso';
    }
  }
}

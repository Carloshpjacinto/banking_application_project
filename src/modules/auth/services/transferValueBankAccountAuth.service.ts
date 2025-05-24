import { Injectable } from '@nestjs/common';
import { DepositTransferService } from 'src/modules/type-oftranfer/services/depositTransfer.service';
import {
  FunctionTransfer,
  TransferValueBankAccountAuthDTO,
} from '../dto/transfer-value-bank-account-auth.dto';
import { DebitTransferTransferService } from 'src/modules/type-oftranfer/services/debitTransfer.service';
import { CreditTransferTransferService } from 'src/modules/type-oftranfer/services/creditTransfer.service';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class TransferValueBankAccountAuthService {
  constructor(
    private readonly depositTransferService: DepositTransferService,
    private readonly debitTransferTransferService: DebitTransferTransferService,
    private readonly creditTransferTransferService: CreditTransferTransferService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    if (
      body.type_transfer == TransferType.DEPOSIT &&
      body.function_transfer != FunctionTransfer.TRANSFER_CREDIT &&
      body.function_transfer != FunctionTransfer.TRANSFER_DEBIT
    ) {
      await this.depositTransferService.execute(userId, body);

      return 'transferencia realizada com sucesso';
    } else if (body.type_transfer == TransferType.PIX_TRANSFER) {
      if (body.function_transfer == FunctionTransfer.TRANSFER_CREDIT) {
        await this.creditTransferTransferService.execute(userId, body);

        return 'transferencia realizada com sucesso';
      }

      if (body.function_transfer == FunctionTransfer.TRANSFER_DEBIT) {
        await this.debitTransferTransferService.execute(userId, body);

        return 'transferencia realizada com sucesso';
      }
    } else {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais`,
      );
    }
  }
}

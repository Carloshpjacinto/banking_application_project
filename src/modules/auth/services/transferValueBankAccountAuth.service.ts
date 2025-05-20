import { Injectable } from '@nestjs/common';
import { DepositTransferService } from 'src/modules/type-oftranfer/services/DepositTransfer.service';
import { TransferValueBankAccountAuthDTO } from '../dto/transfer-value-bank-account-auth.dto';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class TransferValueBankAccountAuthService {
  constructor(
    private readonly depositTransferService: DepositTransferService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    if (body.type_transfer == TransferType.DEPOSIT) {
      await this.depositTransferService.execute(userId, body);
    }
  }
}

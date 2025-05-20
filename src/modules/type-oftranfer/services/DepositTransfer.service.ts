import { Injectable } from '@nestjs/common';
import { TransferValueBankAccountAuthDTO } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { DebitUpdateValueBankAccountService } from 'src/modules/bankaccount/services/debitUpdateValueBankAccount.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import * as bcrypt from 'bcrypt';
import { CalculationMoney } from 'src/modules/bankaccount/tools/calculationMoney.tool';
import {
  Situation,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class DepositTransferService {
  constructor(
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly debitUpdateValueBankAccountService: DebitUpdateValueBankAccountService,
    private readonly createBankAccountHistoryService: CreateBankAccountHistoryService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    try {
      const senderBankAccount =
        await this.findBankAccountByUserIdService.execute(userId);

      if (
        !senderBankAccount ||
        !(await bcrypt.compare(body.access, senderBankAccount.access))
      ) {
        throw new Error('Error de autenticação, tente novamente');
      }

      const SenderCalculation = CalculationMoney(
        Number(senderBankAccount.debit),
        Number(body.trans_value),
        TransferType.DEBIT_TRANSFER,
      );

      await this.debitUpdateValueBankAccountService.execute(
        senderBankAccount.id,
        String(SenderCalculation),
      );

      await this.createBankAccountHistoryService.execute({
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: senderBankAccount.user.CPF,
        transfer_type: TransferType.DEPOSIT,
        situation: Situation.DEPOSIT,
        trans_value: body.trans_value,
      });
    } catch (err) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

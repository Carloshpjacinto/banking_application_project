import { Injectable } from '@nestjs/common';
import {
  TransferType,
  TransferValueBankAccountAuthDTO,
} from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { SpecialCheckUpdateValueBankAccountService } from 'src/modules/bankaccount/services/specialcheckUpdateValueBankAccount.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { CalculationMoney } from 'src/shared/tools/calculationMoney.tool';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class DebitTransferTransferService {
  constructor(
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly specialCheckUpdateValueBankAccountService: SpecialCheckUpdateValueBankAccountService,
    private readonly balanceAccountUpdateValueService: BalanceAccountUpdateValueService,
    private readonly createBankAccountHistoryService: CreateBankAccountHistoryService,
    private readonly findUserByCpfService: FindUserByCpfService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    try {
      let SenderCalculation: number;

      const senderBankAccount =
        await this.findBankAccountByUserIdService.execute(userId);

      if (
        !senderBankAccount ||
        !(await bcrypt.compare(body.access, senderBankAccount.access))
      ) {
        throw new Error('Error de autenticação, tente novamente');
      }

      const recipient = await this.findUserByCpfService.execute(
        body.cpf_recipient,
      );

      if (!recipient) {
        throw new Error(
          `Erro ao realizar transação bancaria, tente novamente mais`,
        );
      }

      if (body.transfer_value > senderBankAccount.account_balance) {
        if (body.transfer_value > senderBankAccount.special_check) {
          throw new Error(`Saldo insuficiente`);
        }
        SenderCalculation = CalculationMoney(
          Number(senderBankAccount.special_check),
          Number(body.transfer_value),
          TransferType.PIX_TRANSFER,
        );

        await this.specialCheckUpdateValueBankAccountService.execute(
          senderBankAccount.id,
          String(SenderCalculation),
        );

        SenderCalculation = -Math.abs(SenderCalculation);

        await this.balanceAccountUpdateValueService.execute(
          senderBankAccount.id,
          String(SenderCalculation),
        );
      } else {
        SenderCalculation = CalculationMoney(
          Number(senderBankAccount.account_balance),
          Number(body.transfer_value),
          TransferType.PIX_TRANSFER,
        );

        await this.balanceAccountUpdateValueService.execute(
          senderBankAccount.id,
          String(SenderCalculation),
        );
      }

      await this.createBankAccountHistoryService.execute({
        transfer_type: TransferType.PIX_TRANSFER,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: body.cpf_recipient,
        transfer_value: body.transfer_value,
        description: Description.SENT,
      });

      const recipientBankAccount =
        await this.findBankAccountByUserIdService.execute(recipient.id);

      const recipientCalculation = CalculationMoney(
        Number(recipientBankAccount.account_balance),
        Number(body.transfer_value),
        TransferType.DEPOSIT,
      );

      await this.balanceAccountUpdateValueService.execute(
        recipientBankAccount.id,
        String(recipientCalculation),
      );

      await this.createBankAccountHistoryService.execute({
        transfer_type: TransferType.PIX_TRANSFER,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: body.cpf_recipient,
        transfer_value: body.transfer_value,
        description: Description.RECEIVED,
      });
    } catch (err) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

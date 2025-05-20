import { Injectable } from '@nestjs/common';
import { TransferValueBankAccountAuthDTO } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { DebitUpdateValueBankAccountService } from 'src/modules/bankaccount/services/debitUpdateValueBankAccount.service';
import { CalculationMoney } from 'src/modules/bankaccount/tools/calculationMoney.tool';
import {
  Situation,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import { CreditUpdateValueBankAccountService } from 'src/modules/bankaccount/services/creditUpdateValueBankAccount.service';
import { SpecialCheckUpdateValueBankAccountService } from 'src/modules/bankaccount/services/specialcheckUpdateValueBankAccount.service';
import { TypeBankAccount } from 'src/modules/bankaccount/dto/create-bankaccount.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreditTransferTransferService {
  constructor(
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly debitUpdateValueBankAccountService: DebitUpdateValueBankAccountService,
    private readonly creditUpdateValueBankAccountService: CreditUpdateValueBankAccountService,
    private readonly specialCheckUpdateValueBankAccountService: SpecialCheckUpdateValueBankAccountService,
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

      if (senderBankAccount.type_bank_account != TypeBankAccount.CREDIT) {
        throw new Error(
          `Erro ao realizar transação bancaria, tente novamente mais`,
        );
      }

      if (body.trans_value > senderBankAccount.credit) {
        if (body.trans_value > senderBankAccount.special_check) {
          throw new Error(`Saldo insuficiente`);
        }
        SenderCalculation = CalculationMoney(
          Number(senderBankAccount.special_check),
          Number(body.trans_value),
          TransferType.DEBIT_TRANSFER,
        );

        await this.specialCheckUpdateValueBankAccountService.execute(
          senderBankAccount.id,
          String(SenderCalculation),
        );
      } else {
        SenderCalculation = CalculationMoney(
          Number(senderBankAccount.credit),
          Number(body.trans_value),
          TransferType.CREDIT_TRANSFER,
        );
      }

      await this.creditUpdateValueBankAccountService.execute(
        senderBankAccount.id,
        String(SenderCalculation),
      );

      await this.createBankAccountHistoryService.execute({
        transfer_type: TransferType.CREDIT_TRANSFER,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: body.cpf_recipient,
        trans_value: body.trans_value,
        situation: Situation.SENT,
      });

      const recipient = await this.findUserByCpfService.execute(
        body.cpf_recipient,
      );

      if (!recipient) {
        throw new Error(
          `Erro ao realizar transação bancaria, tente novamente mais`,
        );
      }

      const recipientBankAccount =
        await this.findBankAccountByUserIdService.execute(recipient.id);

      const recipientCalculation = CalculationMoney(
        Number(recipientBankAccount.debit),
        Number(body.trans_value),
        TransferType.DEPOSIT,
      );

      await this.debitUpdateValueBankAccountService.execute(
        recipientBankAccount.id,
        String(recipientCalculation),
      );

      await this.createBankAccountHistoryService.execute({
        transfer_type: TransferType.CREDIT_TRANSFER,
        cpf_sender: senderBankAccount.user.CPF,
        cpf_recipient: body.cpf_recipient,
        trans_value: body.trans_value,
        situation: Situation.RECEIVED,
      });
    } catch (err) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

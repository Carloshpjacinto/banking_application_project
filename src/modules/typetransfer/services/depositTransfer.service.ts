import { Injectable } from '@nestjs/common';
import { TransferValueBankAccountAuthDTO } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { BalanceAccountUpdateValueService } from 'src/modules/bankaccount/services/balanceAccountUpdateValue.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { CalculationMoney } from 'src/shared/tools/calculationMoney.tool';
import {
  Description,
  TransferType,
} from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { SpecialCheckUpdateValueService } from 'src/modules/bankaccount/services/specialcheckUpdateValue.service';

@Injectable()
export class DepositTransferService {
  constructor(
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly balanceAccountUpdateValueService: BalanceAccountUpdateValueService,
    private readonly specialCheckUpdateValueService: SpecialCheckUpdateValueService,
    private readonly createBankAccountHistoryService: CreateBankAccountHistoryService,
  ) {}

  async execute(userId: number, body: TransferValueBankAccountAuthDTO) {
    try {
      const valueSpecialCheck: string = '250';

      const senderBankAccount =
        await this.findBankAccountByUserIdService.execute(userId);

      if (senderBankAccount.special_check < valueSpecialCheck) {
        const DebitSpecialCheck =
          Number(valueSpecialCheck) - Number(senderBankAccount.special_check);

        const SenderCalculationSpecialCheck = CalculationMoney(
          Number(senderBankAccount.special_check),
          Number(DebitSpecialCheck),
          TransferType.DEPOSIT,
        );

        await this.specialCheckUpdateValueService.execute(
          senderBankAccount.id,
          String(SenderCalculationSpecialCheck),
        );

        const calculationDebitSpecialCheck =
          Number(body.transfer_value) - DebitSpecialCheck;

        await this.balanceAccountUpdateValueService.execute(
          senderBankAccount.id,
          String(calculationDebitSpecialCheck),
        );

        await this.createBankAccountHistoryService.execute({
          cpf_sender: senderBankAccount.user.CPF,
          cpf_recipient: senderBankAccount.user.CPF,
          transfer_type: TransferType.DEPOSIT,
          description: Description.DEPOSIT,
          transfer_value: body.transfer_value,
        });
      } else {
        const SenderCalculation = CalculationMoney(
          Number(senderBankAccount.account_balance),
          Number(body.transfer_value),
          TransferType.DEPOSIT,
        );

        await this.balanceAccountUpdateValueService.execute(
          senderBankAccount.id,
          String(SenderCalculation),
        );

        await this.createBankAccountHistoryService.execute({
          cpf_sender: senderBankAccount.user.CPF,
          cpf_recipient: senderBankAccount.user.CPF,
          transfer_type: TransferType.DEPOSIT,
          description: Description.DEPOSIT,
          transfer_value: body.transfer_value,
        });
      }
    } catch (err) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

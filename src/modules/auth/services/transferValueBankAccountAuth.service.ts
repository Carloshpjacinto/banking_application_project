import { Injectable } from '@nestjs/common';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { UpdateValueBankAccountService } from 'src/modules/bankaccount/services/updateValueBankAccount.service';
import { CreateBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/createBankAccountHistory.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import { TransferValueBankAccountAuthDTO } from '../dto/transfer-value-bank-account-auth.dto';
import { verificationValueBankAccount } from '../tools/verificationValueBankAccount.tool';
import { CalculationMoney } from '../tools/calculationMoney.tool';
import * as bcrypt from 'bcrypt';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class TransferValueBankAccountAuthService {
  constructor(
    private readonly findUserByCpfService: FindUserByCpfService,
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly updateValueBankAccountService: UpdateValueBankAccountService,
    private readonly createBankAccountHistoryService: CreateBankAccountHistoryService,
  ) {}

  async execute(cpf_sender: string, body: TransferValueBankAccountAuthDTO) {
    try {
      const recipient = await this.findUserByCpfService.execute(
        body.cpf_recipient,
      );

      const sender = await this.findUserByCpfService.execute(cpf_sender);

      if (!sender) throw new Error(`Usuário não encontrado`);

      const senderBankAccount =
        await this.findBankAccountByUserIdService.execute(sender.id);

      if (
        !senderBankAccount ||
        !(await bcrypt.compare(body.access, senderBankAccount.access))
      ) {
        throw new Error('Error de autenticação, tente novamente');
      }

      verificationValueBankAccount(
        Number(senderBankAccount.debit),
        Number(body.trans_value),
      );

      const SenderCalculation = CalculationMoney(
        Number(senderBankAccount.debit),
        Number(body.trans_value),
      );

      if (recipient) {
        const recipientBankAccount =
          await this.findBankAccountByUserIdService.execute(recipient.id);

        const recipientCalculation = CalculationMoney(
          Number(recipientBankAccount.debit),
          Number(body.trans_value),
          true,
        );

        await this.updateValueBankAccountService.execute(
          recipientBankAccount.id,
          String(recipientCalculation),
        );
      }

      await this.updateValueBankAccountService.execute(
        senderBankAccount.id,
        String(SenderCalculation),
      );

      await this.createBankAccountHistoryService.execute({
        transfer_type: TransferType.DEBIT_TRANSEFR,
        cpf_sender: sender.CPF,
        cpf_recipient: body.cpf_recipient,
        trans_value: body.trans_value,
      });

      return 'transferencia realizada com sucesso';
    } catch (err) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

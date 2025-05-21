import { Injectable } from '@nestjs/common';
import { FindBankAccountHistoryReceivedService } from 'src/modules/bankaccounthistory/services/findBankAccountHistory.service';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class FindBankAccountHistoryReceivedAuthService {
  constructor(
    private readonly findBankAccountByAccountService: FindBankAccountHistoryReceivedService,
  ) {}

  async execute(cpf: string, description: Description) {
    try {
      return await this.findBankAccountByAccountService.execute(
        cpf,
        description,
      );
    } catch (err) {
      throw new Error(
        `Erro procurar historico da conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

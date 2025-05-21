import { Injectable } from '@nestjs/common';
import { FindBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/findBankAccountHistory.service';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

@Injectable()
export class FindBankAccountHistoryReceivedAuthService {
  constructor(
    private readonly findBankAccountHistoryService: FindBankAccountHistoryService,
  ) {}

  async execute(cpf: string, description: Description) {
    try {
      return await this.findBankAccountHistoryService.execute(cpf, description);
    } catch (err) {
      throw new Error(
        `Erro procurar historico da conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

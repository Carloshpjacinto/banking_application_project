import { Injectable } from '@nestjs/common';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';

@Injectable()
export class ProfileBankAccountAuthService {
  constructor(
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  async execute(userId: number) {
    try {
      const bankAccount =
        await this.findBankAccountByUserIdService.execute(userId);

      const user = await this.findUserByIdService.execute(bankAccount.userId);

      const userBankAccount = {
        name: user.name ?? '',
        email: user?.email ?? '',
        account_data: {
          num_account: bankAccount?.num_account ?? '',
          agency: bankAccount?.agency ?? '',
          debit: bankAccount?.debit ?? 0,
        },
      };

      return userBankAccount;
    } catch (err) {
      throw new Error(
        `Erro ao encontrar conta bancaria, tente novamente mais tarde, ${err}`,
      );
    }
  }
}

import { Injectable } from '@nestjs/common';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import {
  ACCOUNTDATA,
  ProfileBankAccountAuthDTO,
} from '../dto/profile-bank-account-auth.dto';
import { TypeBankAccount } from 'src/modules/bankaccount/entities/bankaccount.entity';

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

      let accountData: ACCOUNTDATA = {
        agency: bankAccount?.agency ?? '',
        num_account: bankAccount?.num_account ?? '',
        account_balance: bankAccount.account_balance ?? 0,
        credit: bankAccount.credit ?? 0,
        special_check: bankAccount?.special_check ?? 0,
        debit_account: bankAccount.debit_account ?? 0,
        type_bank_account: bankAccount.type_bank_account ?? '',
      };

      if (bankAccount.type_bank_account === TypeBankAccount.SAVINGS_ACCOUNT) {
        accountData = {
          ...accountData,
          credit: bankAccount?.credit ?? 0,
        };
      }

      const userBankAccount: ProfileBankAccountAuthDTO = {
        name: user?.name ?? '',
        email: user?.email ?? '',
        account_data: accountData,
      };

      return userBankAccount;
    } catch (err) {
      throw new Error(
        `Erro ao encontrar conta bancaria, tente novamente mais tarde, ${err}`,
      );
    }
  }
}

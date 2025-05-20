import { Injectable } from '@nestjs/common';
import { TypeBankAccount } from 'src/modules/bankaccount/dto/create-bankaccount.dto';
import { FindBankAccountByUserIdService } from 'src/modules/bankaccount/services/findBankAccountByUserId.service';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';
import {
  ACCOUNTDATA,
  ProfileBankAccountAuthDTO,
} from '../dto/profile-bank-account-auth.dto';

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
        type_bank_account: bankAccount.type_bank_account ?? '',
        debit: bankAccount?.debit ?? 0,
        special_check: bankAccount?.special_check ?? 0,
      };

      if (bankAccount.type_bank_account === TypeBankAccount.CREDIT) {
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

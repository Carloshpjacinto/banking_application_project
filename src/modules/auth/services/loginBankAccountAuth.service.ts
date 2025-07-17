import { Injectable } from '@nestjs/common';
import { FindBankAccountByAccountService } from 'src/modules/bankaccount/services/findBankAccountByAccount.service';
import { LoginBankAccountAuthDTO } from '../dto/login-bank-account-auth.dto';
import * as bcrypt from 'bcrypt';
import { GenerateJwtToken } from '../tools/generateJwtToken.tool';
import { FindUserByIdService } from 'src/modules/user/services/findUserById.service';

@Injectable()
export class LoginBankAccountAuthService {
  constructor(
    private readonly findBankAccountByAccountService: FindBankAccountByAccountService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly generateJwtToken: GenerateJwtToken,
  ) {}

  async execute(body: LoginBankAccountAuthDTO) {
    try {
      const existingBankAccount =
        await this.findBankAccountByAccountService.execute(body.num_account);

      if (!existingBankAccount.access)
        throw new Error(`Erro ao encontrar conta!`);

      if (
        !existingBankAccount ||
        !(await bcrypt.compare(body.access, existingBankAccount.access))
      ) {
        throw new Error('Error ao fazer login, tente novamente');
      }

      const user = await this.findUserByIdService.execute(
        existingBankAccount.user.id,
      );

      if (!user) {
        throw new Error('Conta não encontrado, tente novamente');
      }

      return this.generateJwtToken.execute(user);
    } catch (err) {
      throw new Error(
        `Erro ao fazer login na conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

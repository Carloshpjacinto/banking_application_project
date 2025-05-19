import { Injectable } from '@nestjs/common';
import { CreateBankAccountService } from 'src/modules/bankaccount/services/createBankAccount.service';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import { FindBankAccountByAccessService } from 'src/modules/bankaccount/services/findBankAccountByAccess.service';
import { validateExisting } from '../tools/validateExistingUser.tool';

@Injectable()
export class RegisterBankAccountAuthService {
  constructor(
    private readonly createBankAccountService: CreateBankAccountService,
    private readonly findBankAccountByAccessService: FindBankAccountByAccessService,
  ) {}

  async execute(body: CreateBankAccountAuthDto) {
    try {
      const existingBank = await this.findBankAccountByAccessService.execute(
        body.access,
      );

      validateExisting({ bankAccount: existingBank, createBank: body });

      const bankaccount = await this.createBankAccountService.execute(body);

      return bankaccount;
    } catch (err) {
      throw new Error(
        `Erro ao criar conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

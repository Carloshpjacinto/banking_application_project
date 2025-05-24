/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateBankAccountService } from 'src/modules/bankaccount/services/createBankAccount.service';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import { FindBankAccountByAccessService } from 'src/modules/bankaccount/services/findBankAccountByAccess.service';
import { validateExisting } from '../tools/validateExistingUser.tool';
import { hashData } from 'src/shared/tools/hashData.tool';

@Injectable()
export class RegisterBankAccountAuthService {
  constructor(
    private readonly createBankAccountService: CreateBankAccountService,
    private readonly findBankAccountByAccessService: FindBankAccountByAccessService,
  ) {}

  async execute(userId: number, body: CreateBankAccountAuthDto) {
    try {
      const existingBank = await this.findBankAccountByAccessService.execute(
        body.access,
      );

      validateExisting({ bankAccount: existingBank, createBank: body });

      body.access = await hashData(body.access);

      const bankaccount = await this.createBankAccountService.execute(
        userId,
        body,
      );

      const { access, ...rest } = bankaccount;

      return rest;
    } catch (err) {
      throw new Error(
        `Erro ao criar conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

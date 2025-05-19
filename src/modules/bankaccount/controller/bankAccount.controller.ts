import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountService } from '../services/createBankAccount';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';

@Controller('bankaccount')
export class BankAccountController {
  constructor(
    private readonly createBankAccountService: CreateBankAccountService,
  ) {}

  @Post()
  create(@Body() body: CreateBankaccountDto) {
    return this.createBankAccountService.execute(body);
  }
}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateBankAccountService } from '../services/createBankAccount.service';
import { CreateBankaccountDto } from '../dto/create-bankaccount.dto';
import { FindBankAccountByAccountService } from '../services/findBankAccountByAccount.service';
import { FindBankAccountByUserIdService } from '../services/findBankAccountByUserId.service';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { ParamId } from 'src/shared/decorators/paramId.decorator';

@Controller('bankaccount')
export class BankAccountController {
  constructor(
    private readonly createBankAccountService: CreateBankAccountService,
    private readonly findBankAccountByAccountService: FindBankAccountByAccountService,
    private readonly findBankAccountByUserIdService: FindBankAccountByUserIdService,
  ) {}

  @Post()
  create(
    @UserRequest('id') userId: number,
    @Body() body: CreateBankaccountDto,
  ) {
    return this.createBankAccountService.execute(userId, body);
  }

  @Get()
  findBankAccountByAccount(@Query('num_account') num_account: string) {
    return this.findBankAccountByAccountService.execute(num_account);
  }

  @Get(':id')
  findUserById(@ParamId() id: number) {
    return this.findBankAccountByUserIdService.execute(id);
  }
}

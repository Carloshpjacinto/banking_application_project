import { Body, Controller, Post } from '@nestjs/common';
import { CreateBankAccountHistoryService } from '../services/createBankAccountHistory.service';
import { CreateBankaccounthistoryDto } from '../dto/create-bankaccounthistory.dto';

@Controller('bankaccountHistory')
export class BankAccountHistoryController {
  constructor(
    private readonly createBankAccountHistoryService: CreateBankAccountHistoryService,
  ) {}

  @Post()
  create(@Body() body: CreateBankaccounthistoryDto) {
    return this.createBankAccountHistoryService.execute(body);
  }
}

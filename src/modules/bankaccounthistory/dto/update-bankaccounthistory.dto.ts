import { PartialType } from '@nestjs/mapped-types';
import { CreateBankaccounthistoryDto } from './create-bankaccounthistory.dto';

export class UpdateBankaccounthistoryDto extends PartialType(
  CreateBankaccounthistoryDto,
) {}

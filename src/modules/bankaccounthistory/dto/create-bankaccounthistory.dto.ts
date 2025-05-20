import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransferType } from '../entities/BankAccountHistory.entity';

export class CreateBankaccounthistoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  cpf_sender: string;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(12)
  cpf_recipient: string;

  @IsEnum(TransferType)
  @IsNotEmpty()
  @MaxLength(12)
  transfer_type: TransferType;

  @IsDecimal()
  @IsNotEmpty()
  trans_value: string;
}

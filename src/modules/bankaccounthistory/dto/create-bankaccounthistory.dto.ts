import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  Description,
  TransferType,
} from '../entities/BankAccountHistory.entity';

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
  @MaxLength(255)
  transfer_type: TransferType;

  @IsEnum(Description)
  @IsNotEmpty()
  description?: Description;

  @IsDecimal()
  @IsNotEmpty()
  transfer_value: string;
}

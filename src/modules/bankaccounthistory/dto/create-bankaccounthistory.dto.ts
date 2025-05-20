import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { Situation, TransferType } from '../entities/BankAccountHistory.entity';

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

  @IsEnum(Situation)
  @IsNotEmpty()
  situation?: Situation;

  @IsDecimal()
  @IsNotEmpty()
  trans_value: string;
}

import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateBankaccounthistoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  cpf_sender: string;

  @IsNumber()
  @IsNotEmpty()
  @MaxLength(12)
  cpf_recipient: string;

  @IsDecimal()
  @IsNotEmpty()
  trans_value: string;
}

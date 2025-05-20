import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

export class TransferValueBankAccountAuthDTO {
  @IsEnum(TransferType)
  @IsNotEmpty()
  type_transfer: TransferType;

  @IsString()
  @IsNotEmpty()
  cpf_recipient: string;

  @IsString()
  @IsNotEmpty()
  trans_value: string;

  @IsString()
  @IsNotEmpty()
  access: string;
}

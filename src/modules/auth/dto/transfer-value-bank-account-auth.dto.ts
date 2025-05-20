import { IsNotEmpty, IsString } from 'class-validator';

export class TransferValueBankAccountAuthDTO {
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

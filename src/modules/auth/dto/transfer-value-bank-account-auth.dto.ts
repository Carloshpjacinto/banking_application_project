import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

export enum FunctionTransfer {
  TRANSFER_CREDIT = 'TRANSFER_CREDIT',
  TRANSFER_DEBIT = 'TRANSFER_DEBIT',
}

export class TransferValueBankAccountAuthDTO {
  @IsEnum(TransferType)
  @IsNotEmpty()
  type_transfer: TransferType;

  @IsString()
  @IsNotEmpty()
  cpf_recipient: string;

  @IsEnum(FunctionTransfer)
  @IsNotEmpty()
  function_transfer?: FunctionTransfer;

  @IsString()
  @IsNotEmpty()
  transfer_value: string;

  @IsString()
  @IsNotEmpty()
  access: string;
}

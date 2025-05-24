import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum FunctionTransfer {
  TRANSFER_CREDIT = 'TRANSFER_CREDIT',
  TRANSFER_DEBIT = 'TRANSFER_DEBIT',
}

export enum TransferType {
  PIX_TRANSFER = 'PIX_TRANSFER',
  DEPOSIT = 'DEPOSIT',
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

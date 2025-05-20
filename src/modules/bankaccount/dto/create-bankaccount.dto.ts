import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export enum TypeBankAccount {
  CURRENT = 'CURRENT',
  CREDIT = 'CREDIT',
}

export class CreateBankaccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  access: string;

  @IsEnum(TypeBankAccount)
  @IsNotEmpty()
  type_bank_account: TypeBankAccount;
}

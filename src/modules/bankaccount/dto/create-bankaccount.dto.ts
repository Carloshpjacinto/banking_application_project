import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TypeBankAccount } from '../entities/bankaccount.entity';

export class CreateBankaccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  access?: string;

  @IsEnum(TypeBankAccount)
  @IsNotEmpty()
  type_bank_account: TypeBankAccount;
}

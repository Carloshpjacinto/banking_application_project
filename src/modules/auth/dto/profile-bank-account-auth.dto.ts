import { IsNotEmpty, IsString } from 'class-validator';

export interface ACCOUNTDATA {
  agency: string;
  num_account: string;
  type_bank_account: string;
  debit: string;
  special_check: string;
  credit?: string;
}

export class ProfileBankAccountAuthDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  account_data: ACCOUNTDATA;
}

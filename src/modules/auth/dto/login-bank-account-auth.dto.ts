import { IsNotEmpty, IsString } from 'class-validator';

export class LoginBankAccountAuthDTO {
  @IsString()
  @IsNotEmpty()
  num_account: string;

  @IsString()
  @IsNotEmpty()
  access: string;
}

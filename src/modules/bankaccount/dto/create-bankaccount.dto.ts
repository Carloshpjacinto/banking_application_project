import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBankaccountDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  access: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

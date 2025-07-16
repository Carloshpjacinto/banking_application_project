import { User } from 'src/modules/user/entities/user.entity';
import { CreateUserAuthDto } from '../../modules/auth/dto/create-user-auth.dto';
import { ConflictException } from '@nestjs/common';
import { Bankaccount } from 'src/modules/bankaccount/entities/bankaccount.entity';
import { CreateBankAccountAuthDto } from '../../modules/auth/dto/create-bankaccount-auth.dto';

export function validateExisting(params: {
  user?: User | null;
  createUser?: CreateUserAuthDto | null;
  bankAccount?: Bankaccount | null;
  createBank?: CreateBankAccountAuthDto | null;
}): void {
  const { user, createUser, bankAccount, createBank } = params;

  if (user && createUser) {
    if (
      user?.CPF == createUser?.CPF ||
      user?.email == createUser?.email ||
      user?.name == createUser?.name
    ) {
      throw new ConflictException('Existing user');
    }
  }

  if (bankAccount && createBank) {
    if (bankAccount.access == createBank?.access) {
      throw new ConflictException('Existing user');
    }
  }
}

import { Bankaccount } from '../entities/bankaccount.entity';

export function verificationValueBankAccount(
  balanceUserBankAccount: Bankaccount,
  valueTransfer: number,
  debit: boolean,
  credit: boolean,
): boolean {
  if (debit) {
    if (Number(balanceUserBankAccount.account_balance) < valueTransfer) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais`,
      );
    }
  }

  if (credit) {
    if (Number(balanceUserBankAccount.credit) < valueTransfer) {
      throw new Error(
        `Erro ao realizar transação bancaria, tente novamente mais`,
      );
    }
  }

  return true;
}

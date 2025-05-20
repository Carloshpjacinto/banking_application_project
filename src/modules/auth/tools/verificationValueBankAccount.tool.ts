export function verificationValueBankAccount(
  debitUserBankAccount: number,
  valueTransfer: number,
): boolean {
  if (
    Number(debitUserBankAccount) <= 0 ||
    Number(debitUserBankAccount < Number(valueTransfer))
  ) {
    throw new Error('Saldo insuficiente');
  }

  return true;
}

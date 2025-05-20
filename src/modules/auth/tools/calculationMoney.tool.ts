export function CalculationMoney(
  debitUserBankAccount: number,
  valueTransfer: number,
  recipient?: true,
): number {
  if (recipient) {
    return Number(debitUserBankAccount) + Number(valueTransfer);
  }

  return Number(debitUserBankAccount) - Number(valueTransfer);
}

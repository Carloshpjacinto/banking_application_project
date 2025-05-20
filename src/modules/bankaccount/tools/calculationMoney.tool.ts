import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';

export function CalculationMoney(
  BalanceUserBankAccount: number,
  valueTransfer: number,
  transferType?: TransferType,
): number {
  if (transferType == TransferType.DEPOSIT) {
    if (valueTransfer > 5000) {
      throw new Error(`Valor acima do permitido`);
    }

    return BalanceUserBankAccount + valueTransfer;
  }
  if (
    transferType === TransferType.DEBIT_TRANSFER ||
    transferType === TransferType.CREDIT_TRANSFER
  ) {
    return BalanceUserBankAccount + valueTransfer;
  }

  throw new Error('Tipo de transferência não especificado ou inválido');
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TransferType } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';

export function CalculationMoney(
  currentBalance: number,
  transferValue: number,
  transferType?: TransferType,
): number {
  if (!transferType) {
    throw new Error('Tipo de transferência não especificado.');
  }

  switch (transferType) {
    case TransferType.DEPOSIT:
      if (transferValue > 5000) {
        throw new Error('Valor acima do limite permitido para depósitos.');
      }
      return currentBalance + transferValue;

    case TransferType.PIX_TRANSFER:
      return currentBalance - transferValue;

    default:
      throw new Error(`Tipo de transferência inválido: ${transferType}`);
  }
}

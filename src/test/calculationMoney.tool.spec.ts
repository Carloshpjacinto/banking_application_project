import { TransferType } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { CalculationMoney } from 'src/shared/tools/calculationMoney.tool';

describe('CalculationMoney', () => {
  it('should add the amount to the balance for a valid deposit', () => {
    const result = CalculationMoney(1000, 2000, TransferType.DEPOSIT);
    expect(result).toBe(3000);
  });

  it('should throw an error for deposits over the 5000 limit', () => {
    expect(() => CalculationMoney(1000, 6000, TransferType.DEPOSIT)).toThrow(
      'Valor acima do limite permitido para depósitos.',
    );
  });

  it('should subtract the amount from the balance for a PIX transfer', () => {
    const result = CalculationMoney(5000, 1500, TransferType.PIX_TRANSFER);
    expect(result).toBe(3500);
  });

  it('should throw an error for an invalid transfer type', () => {
    expect(() =>
      CalculationMoney(1000, 1000, 'TIPO_INVALIDO' as TransferType),
    ).toThrow('Tipo de transferência inválido: TIPO_INVALIDO');
  });

  it('should throw an error when the transfer type is not specified', () => {
    expect(() => CalculationMoney(1000, 1000)).toThrow(
      'Tipo de transferência não especificado.',
    );
  });
});

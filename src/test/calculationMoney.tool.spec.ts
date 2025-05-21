import { CalculationMoney } from 'src/shared/tools/calculationMoney.tool';
import { TransferType } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';

describe('CalculationMoney', () => {
  it('deve somar o valor no saldo para depósito válido', () => {
    const result = CalculationMoney(1000, 2000, TransferType.DEPOSIT);
    expect(result).toBe(3000);
  });

  it('deve lançar erro para depósito acima do limite de 5000', () => {
    expect(() => CalculationMoney(1000, 6000, TransferType.DEPOSIT)).toThrow(
      'Valor acima do limite permitido para depósitos.',
    );
  });

  it('deve subtrair o valor do saldo para transferência PIX', () => {
    const result = CalculationMoney(5000, 1500, TransferType.PIX_TRANSFER);
    expect(result).toBe(3500);
  });

  it('deve lançar erro para tipo de transferência inválido', () => {
    expect(() =>
      CalculationMoney(1000, 1000, 'TIPO_INVALIDO' as TransferType),
    ).toThrow('Tipo de transferência inválido: TIPO_INVALIDO');
  });

  it('deve lançar erro quando tipo de transferência não for especificado', () => {
    expect(() => CalculationMoney(1000, 1000)).toThrow(
      'Tipo de transferência não especificado.',
    );
  });
});

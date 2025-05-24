import { hashData } from 'src/shared/tools/hashData.tool';
import bcrypt from 'bcrypt';

describe('hashData', () => {
  it('deve retornar um hash da string', async () => {
    const plainText = 'minhaSenhaSegura123';
    const hashed = await hashData(plainText);

    expect(typeof hashed).toBe('string');
    expect(hashed).not.toBe(plainText);
  });

  it('deve gerar um hash válido que bate com o valor original ao usar bcrypt.compare', async () => {
    const plainText = 'senhaParaTestar';
    const hashed = await hashData(plainText);

    const isMatch = await bcrypt.compare(plainText, hashed);
    expect(isMatch).toBe(true);
  });
});

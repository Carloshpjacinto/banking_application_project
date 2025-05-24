import { hashData } from 'src/shared/tools/hashData.tool';
import bcrypt from 'bcrypt';

describe('hashData', () => {
  it('should return a hash of the string', async () => {
    const plainText = 'minhaSenhaSegura123';
    const hashed = await hashData(plainText);

    expect(typeof hashed).toBe('string');
    expect(hashed).not.toBe(plainText);
  });

  it('should generate a valid hash that matches the original value using bcrypt.compare', async () => {
    const plainText = 'senhaParaTestar';
    const hashed = await hashData(plainText);

    const isMatch = await bcrypt.compare(plainText, hashed);
    expect(isMatch).toBe(true);
  });
});

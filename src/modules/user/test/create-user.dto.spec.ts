import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

describe('CreateUserDto', () => {
  it('should validate CPF is required', async () => {
    const dto = plainToInstance(CreateUserDto, {});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'CPF')).toBe(true);
  });

  it('should validate CPF is valid', async () => {
    const dto = plainToInstance(CreateUserDto, {
      CPF: '123.456.789-09', // CPF válido
      name: 'Carlos',
      email: 'carlos@email.com',
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); // Agora espera-se nenhum erro
  });
});

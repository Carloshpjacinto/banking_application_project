import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserByCpfService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(cpf: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { CPF: cpf } });

    if (!user) throw new Error(`Usuário não encontrado`);

    return user;
  }
}

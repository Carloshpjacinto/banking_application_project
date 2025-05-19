import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(data: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(data);

      await this.userRepository.save(newUser);

      return newUser;
    } catch (err) {
      throw new Error(
        `Erro ao criar conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

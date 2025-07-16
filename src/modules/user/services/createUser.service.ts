/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserByCpfService } from './findUserByCpf.service';
import { validateExisting } from 'src/shared/tools/validateExistingUser.tool';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly findUserByCpfService: FindUserByCpfService,
  ) {}
  async execute(body: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.findUserByCpfService.execute(body.CPF);

      validateExisting({ user: existingUser, createUser: body });

      const newUser = this.userRepository.create(body);

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while creating user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

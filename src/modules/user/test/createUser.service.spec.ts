/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/shared/tokens/repositorieTokens';
import { CreateUserService } from '../services/createUser.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { FindUserByCpfService } from '../services/findUserByCpf.service'; // certifique-se que o caminho está correto

let service: CreateUserService;
let userRepository: Partial<Repository<User>>;

const createUserMock = {
  id: 1,
  name: 'Carlos H P Jacinto',
  email: 'teste@teste.com',
  CPF: '12345678910',
};

describe('CreateUserService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: FindUserByCpfService,
          useValue: {
            execute: jest.fn().mockResolvedValue(null), // Simula CPF não encontrado
          },
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<Repository<User>>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(userRepository, 'create').mockReturnValue(createUserMock as any);
    jest.spyOn(userRepository, 'save').mockResolvedValue(createUserMock as any);

    const result = await service.execute(createUserMock);

    expect(userRepository.create).toHaveBeenCalledWith(createUserMock);
    expect(userRepository.save).toHaveBeenCalledWith(createUserMock);
    expect(result).toEqual(createUserMock);
  });
});

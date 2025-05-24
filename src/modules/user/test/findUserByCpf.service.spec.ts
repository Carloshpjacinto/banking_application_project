import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from '../utils/repositoriesToken';
import { FindUserByCpfService } from '../services/findUserByCpf.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

let service: FindUserByCpfService;
let userRepository: Partial<Repository<User>>;

const mockUser: User = {
  id: 1,
  name: 'Carlos H P Jacinto',
  email: 'teste@teste.com',
  CPF: '12345678900',
};

describe('FindUserByCpfService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByCpfService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserByCpfService>(FindUserByCpfService);
    userRepository = module.get(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by Cpf', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.execute(mockUser.CPF);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { CPF: mockUser.CPF },
    });

    expect(result).toEqual(mockUser);
  });
});

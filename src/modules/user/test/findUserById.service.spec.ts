import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY } from 'src/shared/tokens/repositorieTokens';
import { FindUserByIdService } from '../services/findUserById.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

let service: FindUserByIdService;
let userRepository: Partial<Repository<User>>;

const mockUser: User = {
  id: 1,
  name: 'Carlos H P Jacinto',
  email: 'teste@teste.com',
  CPF: '12345678900',
};

describe('FindUserByIdService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
    userRepository = module.get(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a user by id', async () => {
    (userRepository.findOne as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.execute(mockUser.id);

    expect(userRepository.findOne).toHaveBeenCalledWith({
      where: { id: mockUser.id },
    });

    expect(result).toEqual(mockUser);
  });
});

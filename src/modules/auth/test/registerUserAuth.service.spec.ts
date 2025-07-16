/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserAuthService } from '../services/registerUserAuth.service';
import { CreateUserService } from 'src/modules/user/services/createUser.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import { GenerateJwtToken } from '../tools/generateJwtToken.tool';
import { validateExisting } from '../../../shared/tools/validateExistingUser.tool';
import { CreateUserAuthDto } from '../dto/create-user-auth.dto';

jest.mock('../tools/validateExistingUser.tool');

describe('RegisterUserAuthService', () => {
  let service: RegisterUserAuthService;
  let createUserService: CreateUserService;
  let findUserByCpfService: FindUserByCpfService;
  let generateJwtToken: GenerateJwtToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserAuthService,
        {
          provide: CreateUserService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindUserByCpfService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: GenerateJwtToken,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<RegisterUserAuthService>(RegisterUserAuthService);
    createUserService = module.get<CreateUserService>(CreateUserService);
    findUserByCpfService =
      module.get<FindUserByCpfService>(FindUserByCpfService);
    generateJwtToken = module.get<GenerateJwtToken>(GenerateJwtToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register user and return JWT token successfully', async () => {
    const dto: CreateUserAuthDto = {
      CPF: '12345678900',
      name: 'User Test',
      email: 'user@test.com',
    };

    (findUserByCpfService.execute as jest.Mock).mockResolvedValue(null);
    (validateExisting as jest.Mock).mockImplementation(() => {});
    const fakeUser = { id: 1, ...dto };
    (createUserService.execute as jest.Mock).mockResolvedValue(fakeUser);
    (generateJwtToken.execute as jest.Mock).mockReturnValue('jwt_token_mock');

    const result = await service.execute(dto);

    expect(findUserByCpfService.execute).toHaveBeenCalledWith(dto.CPF);
    expect(validateExisting).toHaveBeenCalledWith({
      user: null,
      createUser: dto,
    });
    expect(createUserService.execute).toHaveBeenCalledWith(dto);
    expect(generateJwtToken.execute).toHaveBeenCalledWith(fakeUser);
    expect(result).toBe('jwt_token_mock');
  });

  it('should throw error if validateExisting throws', async () => {
    const dto: CreateUserAuthDto = {
      CPF: '12345678900',
      name: 'User Test',
      email: 'user@test.com',
    };

    (findUserByCpfService.execute as jest.Mock).mockResolvedValue({ id: 1 });
    (validateExisting as jest.Mock).mockImplementation(() => {
      throw new Error('User already exists');
    });

    await expect(service.execute(dto)).rejects.toThrow(
      /Erro ao criar conta bancaria, tente novamente mais, Error: User already exists/,
    );

    expect(findUserByCpfService.execute).toHaveBeenCalledWith(dto.CPF);
    expect(validateExisting).toHaveBeenCalledWith({
      user: { id: 1 },
      createUser: dto,
    });
  });
});

/* eslint-disable @typescript-eslint/unbound-method */
// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../controller/user.controller';
import { CreateUserService } from '../services/createUser.service';
import { FindUserByIdService } from '../services/findUserById.service';

describe('UserController', () => {
  let controller: UserController;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserService,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindUserByIdService,
          useValue: { execute: jest.fn() }, // adicionando mock do segundo service
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    createUserService = module.get<CreateUserService>(CreateUserService);
  });

  it('should create a user', async () => {
    const dto = {
      CPF: '12345678900',
      name: 'Carlos',
      email: 'carlos@email.com',
    };
    const expectedResult = { ...dto, id: 1 };

    jest.spyOn(createUserService, 'execute').mockResolvedValue(expectedResult);

    const result = await controller.create(dto);

    expect(result).toEqual(expectedResult);
    expect(createUserService.execute).toHaveBeenCalledWith(dto);
  });
});

import { Injectable } from '@nestjs/common';
import { CreateUserService } from 'src/modules/user/services/createUser.service';
import { FindUserByCpfService } from 'src/modules/user/services/findUserByCpf.service';
import { CreateUserAuthDto } from '../dto/create-user-auth.dto';
import { GenerateJwtToken } from '../tools/generateJwtToken.tool';
import { validateExisting } from '../tools/validateExistingUser.tool';

@Injectable()
export class RegisterUserAuthService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserByCpfService: FindUserByCpfService,
    private readonly generateJwtToken: GenerateJwtToken,
  ) {}

  async execute(body: CreateUserAuthDto) {
    try {
      const existingUser = await this.findUserByCpfService.execute(body.CPF);

      validateExisting({ user: existingUser, createUser: body });

      const user = await this.createUserService.execute(body);

      return this.generateJwtToken.execute(user);
    } catch (err) {
      throw new Error(
        `Erro ao criar conta bancaria, tente novamente mais, ${err}`,
      );
    }
  }
}

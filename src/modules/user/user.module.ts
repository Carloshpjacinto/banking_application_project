import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserService } from './services/createUser.service';
import { userProviders } from './user.providers';
import { FindUserByCpfService } from './services/findUserByCpf.service';
import { FindUserByIdService } from './services/findUserById.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    CreateUserService,
    FindUserByCpfService,
    FindUserByIdService,
  ],
  exports: [
    CreateUserService,
    FindUserByIdService,
    FindUserByCpfService,
    FindUserByIdService,
  ],
})
export class UserModule {}

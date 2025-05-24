import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserService } from './services/createUser.service';
import { userProviders } from './user.providers';
import { FindUserByCpfService } from './services/findUserByCpf.service';
import { FindUserByIdService } from './services/findUserById.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
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

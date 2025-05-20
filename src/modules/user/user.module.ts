import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserService } from './services/CreateUser.service';
import { userProviders } from './user.providers';
import { FindAllUserService } from './services/findAllUser.service';
import { FindUserByCpfService } from './services/findUserByCpf.service';
import { FindUserByIdService } from './services/findUserById.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProviders,
    CreateUserService,
    FindAllUserService,
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

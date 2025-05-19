import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserService } from './services/createUser.service';
import { userProviders } from './user.providers';
import { FindAllUserService } from './services/findAllUser.service';
import { FindUserByCpfService } from './services/findUserByCpf.service';
import { FindUserByIdService } from './services/findUserById.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [
    ...userProviders,
    CreateUserService,
    FindAllUserService,
    FindUserByCpfService,
    FindUserByIdService,
  ],
  exports: [CreateUserService, FindUserByIdService, FindUserByCpfService],
})
export class UserModule {}

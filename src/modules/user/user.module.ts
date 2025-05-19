import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateUserService } from './services/createUser.service';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserService, ...userProviders],
})
export class UserModule {}

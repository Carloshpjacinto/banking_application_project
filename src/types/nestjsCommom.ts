import { User } from 'src/modules/user/entities/user.entity';

declare module '@nestjs/common' {
  interface Request {
    user: User;
  }
}

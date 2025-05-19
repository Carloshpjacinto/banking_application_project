import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../services/CreateUser.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }
}

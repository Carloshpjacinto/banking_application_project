import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserService } from '../services/createUser.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindAllUserService } from '../services/findAllUser.service';
import { FindUserByIdService } from '../services/findUserById.service';
import { FindUserByCpfService } from '../services/findUserByCpf.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findAllUserService: FindAllUserService,
    private readonly findUserByIdService: FindUserByIdService,
    private readonly findUserByCpfService: FindUserByCpfService,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get()
  findAllUser() {
    return this.findAllUserService.execute();
  }

  @Get(':id')
  findUserById(@Param() id: number) {
    return this.findUserByIdService.execute(id);
  }
}

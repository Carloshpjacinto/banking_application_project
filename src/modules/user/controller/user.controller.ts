import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserService } from '../services/createUser.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindUserByIdService } from '../services/findUserById.service';
import { ParamId } from 'src/shared/decorators/paramId.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserByIdService: FindUserByIdService,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.createUserService.execute(data);
  }

  @Get(':id')
  findUserById(@ParamId() id: number) {
    return this.findUserByIdService.execute(id);
  }
}

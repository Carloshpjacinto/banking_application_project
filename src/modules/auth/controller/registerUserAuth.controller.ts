import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserAuthService } from '../services/registerUserAuth.service';
import { CreateUserAuthDto } from '../dto/create-user-auth.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import { RegisterBankAccountAuthService } from '../services/registerBankAccountAuth.service';

@Controller('auth')
export class RegisterUserAuthController {
  constructor(
    private readonly registerUserAuthService: RegisterUserAuthService,
    private readonly registerBankAccountAuthService: RegisterBankAccountAuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: CreateUserAuthDto) {
    return this.registerUserAuthService.execute(body);
  }

  @UseGuards(AuthGuard)
  @Post('register/access')
  @HttpCode(HttpStatus.CREATED)
  login(
    @UserRequest('id') userId: number,
    @Body() { access }: CreateBankAccountAuthDto,
  ) {
    return this.registerBankAccountAuthService.execute({ userId, access });
  }
}

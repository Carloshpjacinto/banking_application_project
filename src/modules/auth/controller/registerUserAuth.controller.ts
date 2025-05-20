import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserAuthService } from '../services/registerUserAuth.service';
import { CreateUserAuthDto } from '../dto/create-user-auth.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import { RegisterBankAccountAuthService } from '../services/registerBankAccountAuth.service';
import { LoginBankAccountAuthDTO } from '../dto/login-bank-account-auth.dto';
import { LoginBankAccountAuthService } from '../services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from '../services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthDTO } from '../dto/transfer-value-bank-account-auth.dto';
import { TransferValueBankAccountAuthService } from '../services/transferValueBankAccountAuth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserAuthService: RegisterUserAuthService,
    private readonly registerBankAccountAuthService: RegisterBankAccountAuthService,
    private readonly loginBankAccountAuthService: LoginBankAccountAuthService,
    private readonly profileBankAccountAuthService: ProfileBankAccountAuthService,
    private readonly transferValueBankAccountAuthService: TransferValueBankAccountAuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() body: CreateUserAuthDto) {
    return this.registerUserAuthService.execute(body);
  }

  @UseGuards(AuthGuard)
  @Post('register/access')
  @HttpCode(HttpStatus.CREATED)
  registerBankAccount(
    @UserRequest('id') userId: number,
    @Body() { access }: CreateBankAccountAuthDto,
  ) {
    return this.registerBankAccountAuthService.execute({ userId, access });
  }

  @Post('login')
  @HttpCode(HttpStatus.ACCEPTED)
  login(@Body() body: LoginBankAccountAuthDTO) {
    return this.loginBankAccountAuthService.execute(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  profile(@UserRequest('id') userId: number) {
    return this.profileBankAccountAuthService.execute(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('transfer')
  transferencia(
    @UserRequest('CPF') cpf_sender: string,
    @Body() body: TransferValueBankAccountAuthDTO,
  ) {
    return this.transferValueBankAccountAuthService.execute(cpf_sender, body);
  }
}

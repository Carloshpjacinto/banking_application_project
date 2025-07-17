import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserService } from 'src/modules/user/services/createUser.service';
import { CreateUserAuthDto } from '../dto/create-user-auth.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserRequest } from 'src/shared/decorators/user.decorator';
import { CreateBankAccountAuthDto } from '../dto/create-bankaccount-auth.dto';
import { CreateBankAccountService } from 'src/modules/bankaccount/services/createBankAccount.service';
import { LoginBankAccountAuthDTO } from '../dto/login-bank-account-auth.dto';
import { LoginBankAccountAuthService } from '../services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from '../services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthDTO } from '../dto/transfer-value-bank-account-auth.dto';
import { TransferValueBankAccountAuthService } from '../services/transferValueBankAccountAuth.service';
import { Description } from 'src/modules/bankaccounthistory/entities/BankAccountHistory.entity';
import { FindBankAccountHistoryService } from 'src/modules/bankaccounthistory/services/findBankAccountHistory.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly createBankAccountService: CreateBankAccountService,
    private readonly loginBankAccountAuthService: LoginBankAccountAuthService,
    private readonly profileBankAccountAuthService: ProfileBankAccountAuthService,
    private readonly transferValueBankAccountAuthService: TransferValueBankAccountAuthService,
    private readonly findBankAccountHistoryService: FindBankAccountHistoryService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() body: CreateUserAuthDto) {
    return this.createUserService.execute(body);
  }

  @UseGuards(AuthGuard)
  @Post('register/access')
  @HttpCode(HttpStatus.CREATED)
  registerBankAccount(
    @UserRequest('id') userId: number,
    @Body() { access, type_bank_account }: CreateBankAccountAuthDto,
  ) {
    return this.createBankAccountService.execute(userId, {
      access,
      type_bank_account,
    });
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
  @Post('transfer')
  transfer(
    @UserRequest('id') userId: number,
    @Body() body: TransferValueBankAccountAuthDTO,
  ) {
    return this.transferValueBankAccountAuthService.execute(userId, body);
  }

  @UseGuards(AuthGuard)
  @Get('bankaccounthistory')
  @HttpCode(HttpStatus.OK)
  getHistory(
    @UserRequest('CPF') cpf: string,
    @Query('description') description: Description,
  ) {
    return this.findBankAccountHistoryService.execute(cpf, description);
  }
}

import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controller/registerUserAuth.controller';
import { RegisterUserAuthService } from './services/registerUserAuth.service';
import { UserModule } from '../user/user.module';
import { GenerateJwtToken } from './tools/generateJwtToken.tool';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecretConstants } from './utils/jwtSecret.constants';
import { RegisterBankAccountAuthService } from './services/registerBankAccountAuth.service';
import { BankaccountModule } from '../bankaccount/bankaccount.module';
import { ValidateJwtToken } from './tools/validateJwtToken.tool';
import { LoginBankAccountAuthService } from './services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from './services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthService } from './services/transferValueBankAccountAuth.service';
import { BankaccounthistoryModule } from '../bankaccounthistory/bankaccounthistory.module';
import { TypeOftranferModule } from '../type-oftranfer/type-oftranfer.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecretConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => BankaccountModule),
    forwardRef(() => BankaccounthistoryModule),
    forwardRef(() => TypeOftranferModule),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserAuthService,
    GenerateJwtToken,
    RegisterBankAccountAuthService,
    ValidateJwtToken,
    LoginBankAccountAuthService,
    ProfileBankAccountAuthService,
    TransferValueBankAccountAuthService,
  ],
  exports: [GenerateJwtToken, ValidateJwtToken],
})
export class AuthModule {}

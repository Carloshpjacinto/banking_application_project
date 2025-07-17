import { ConfigModule } from '@nestjs/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { GenerateJwtToken } from './tools/generateJwtToken.tool';
import { JwtModule } from '@nestjs/jwt';
import { BankaccountModule } from '../bankaccount/bankaccount.module';
import { ValidateJwtToken } from './tools/validateJwtToken.tool';
import { LoginBankAccountAuthService } from './services/loginBankAccountAuth.service';
import { ProfileBankAccountAuthService } from './services/profileBankAccountAuth.service';
import { TransferValueBankAccountAuthService } from './services/transferValueBankAccountAuth.service';
import { BankaccounthistoryModule } from '../bankaccounthistory/bankaccounthistory.module';
import { TypeOftranferModule } from '../typetransfer/type-oftranfer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.JWTSECRETCONSTANTS,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => BankaccountModule),
    forwardRef(() => BankaccounthistoryModule),
    forwardRef(() => TypeOftranferModule),
  ],
  controllers: [AuthController],
  providers: [
    GenerateJwtToken,
    ValidateJwtToken,
    LoginBankAccountAuthService,
    ProfileBankAccountAuthService,
    TransferValueBankAccountAuthService,
  ],
  exports: [GenerateJwtToken, ValidateJwtToken],
})
export class AuthModule {}

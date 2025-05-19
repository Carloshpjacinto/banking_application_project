import { forwardRef, Module } from '@nestjs/common';
import { RegisterUserAuthController } from './controller/registerUserAuth.controller';
import { RegisterUserAuthService } from './services/registerUserAuth.service';
import { UserModule } from '../user/user.module';
import { GenerateJwtToken } from './tools/generateJwtToken.tool';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecretConstants } from './utils/jwtSecret.constants';
import { RegisterBankAccountAuthService } from './services/registerBankAccountAuth.service';
import { BankaccountModule } from '../bankaccount/bankaccount.module';
import { ValidateJwtToken } from './tools/validateJwtToken.tool';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtSecretConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => BankaccountModule),
  ],
  controllers: [RegisterUserAuthController],
  providers: [
    RegisterUserAuthService,
    GenerateJwtToken,
    RegisterBankAccountAuthService,
    ValidateJwtToken,
  ],
  exports: [GenerateJwtToken, ValidateJwtToken],
})
export class AuthModule {}

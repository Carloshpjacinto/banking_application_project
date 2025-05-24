import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { BankaccountModule } from './modules/bankaccount/bankaccount.module';
import { BankaccounthistoryModule } from './modules/bankaccounthistory/bankaccounthistory.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOftranferModule } from './modules/type-oftranfer/type-oftranfer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    BankaccountModule,
    BankaccounthistoryModule,
    AuthModule,
    TypeOftranferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

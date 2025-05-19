import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { BankaccountModule } from './modules/bankaccount/bankaccount.module';
import { BankaccounthistoryModule } from './modules/bankaccounthistory/bankaccounthistory.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    BankaccountModule,
    BankaccounthistoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

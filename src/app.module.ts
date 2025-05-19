import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { BankaccountModule } from './modules/bankaccount/bankaccount.module';
import { BankaccounthistoryModule } from './modules/bankaccounthistory/bankaccounthistory.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    BankaccountModule,
    BankaccounthistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

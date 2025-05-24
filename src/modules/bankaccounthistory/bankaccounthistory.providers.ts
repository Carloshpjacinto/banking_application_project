import { DataSource } from 'typeorm';
import { Bankaccounthistory } from './entities/BankAccountHistory.entity';

export const bankAccountHistoryProviders = [
  {
    provide: 'BANK_ACCOUNT_HISTORY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Bankaccounthistory),
    inject: ['DATA_SOURCE'],
  },
];

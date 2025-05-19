import { DataSource } from 'typeorm';
import { Bankaccount } from './entities/bankaccount.entity';

export const bankAccountProviders = [
  {
    provide: 'BANK_ACCOUNT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Bankaccount),
    inject: ['DATA_SOURCE'],
  },
];

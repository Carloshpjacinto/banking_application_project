import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const port = Number(process.env.DATABASE_PORT);

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: port,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
        namingStrategy: new SnakeNamingStrategy(),
        logging: false,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

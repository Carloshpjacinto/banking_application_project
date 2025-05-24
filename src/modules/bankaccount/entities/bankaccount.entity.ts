import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum TypeBankAccount {
  CURRENT_ACCOUNT = 'CURRENT_ACCOUNT',
  SAVINGS_ACCOUNT = 'SAVINGS_ACCOUNT',
}

@Entity()
export class Bankaccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  access: string;

  @Column()
  agency: string;

  @Column()
  @Index({ unique: true })
  num_account: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  account_balance: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  credit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  special_check: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  debit_account: string;

  @Column()
  type_bank_account: TypeBankAccount;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeBankAccount } from '../dto/create-bankaccount.dto';

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
  debit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  credit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  special_check: string;

  @Column()
  type_bank_account: TypeBankAccount;

  @Column()
  userId: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

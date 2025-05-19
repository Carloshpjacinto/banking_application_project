import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: number;
}

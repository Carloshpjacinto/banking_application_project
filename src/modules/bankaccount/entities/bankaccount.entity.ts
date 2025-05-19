import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  @Index({ unique: true })
  userId: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bankaccounthistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf_sender: string;

  @Column()
  cpf_recipient: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trans_value: string;
}

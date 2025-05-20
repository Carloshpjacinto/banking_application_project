import { IsDate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransferType {
  DEBIT_TRANSEFR,
  CREDIT_TRANSFER,
  DEPOSIT,
}

@Entity()
export class Bankaccounthistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cpf_sender: string;

  @Column()
  cpf_recipient: string;

  @Column()
  transfer_type: TransferType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trans_value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  date_transfer: Date;
}

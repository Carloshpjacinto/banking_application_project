import { IsDate } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TransferType {
  DEBIT_TRANSFER = 'DEBIT_TRANSFER',
  CREDIT_TRANSFER = 'CREDIT_TRANSFER',
  DEPOSIT = 'DEPOSIT',
}

export enum Situation {
  RECEIVED = 'RECEIVED',
  SENT = 'SENT',
  DEPOSIT = 'DEPOSIT',
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

  @Column()
  situation?: Situation;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  trans_value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  date_transfer: Date;
}

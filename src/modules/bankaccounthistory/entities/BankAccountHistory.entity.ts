import { IsDate } from 'class-validator';
import { TransferType } from 'src/modules/auth/dto/transfer-value-bank-account-auth.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Description {
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
  description: Description;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  transfer_value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  date_transfer: Date;
}

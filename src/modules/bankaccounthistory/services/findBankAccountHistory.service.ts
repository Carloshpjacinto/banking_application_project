/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import {
  Bankaccounthistory,
  Description,
} from '../entities/BankAccountHistory.entity';

@Injectable()
export class FindBankAccountHistoryService {
  constructor(
    @Inject('BANK_ACCOUNT_HISTORY_REPOSITORY')
    private readonly bankAccountHistoryRepository: Repository<Bankaccounthistory>,
  ) {}

  async execute(
    cpf: string,
    description?: Description,
  ): Promise<Bankaccounthistory[] | null> {
    try {
      const whereClause: any = {};

      if (description === Description.RECEIVED) {
        whereClause.cpf_recipient = cpf;
        whereClause.description = Description.RECEIVED;
      } else if (description === Description.SENT) {
        whereClause.cpf_sender = cpf;
        whereClause.description = Description.SENT;
      } else if (description === Description.DEPOSIT) {
        whereClause.cpf_recipient = cpf;
        whereClause.description = Description.DEPOSIT;
      } else {
        return this.bankAccountHistoryRepository.find({
          where: [{ cpf_sender: cpf }, { cpf_recipient: cpf }],
        });
      }

      return this.bankAccountHistoryRepository.find({
        where: whereClause,
      });
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error while find bank account history',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountHistoryController } from '../controller/bankAccountHistory.controller';
import { CreateBankAccountHistoryService } from '../services/createBankAccountHistory.service';
import { CreateBankaccounthistoryDto } from '../dto/create-bankaccounthistory.dto';
import {
  Description,
  TransferType,
} from '../entities/BankAccountHistory.entity';

describe('BankAccountHistoryController', () => {
  let controller: BankAccountHistoryController;
  let service: CreateBankAccountHistoryService;

  const mockCreateBankAccountHistoryService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountHistoryController],
      providers: [
        {
          provide: CreateBankAccountHistoryService,
          useValue: mockCreateBankAccountHistoryService,
        },
      ],
    }).compile();

    controller = module.get<BankAccountHistoryController>(
      BankAccountHistoryController,
    );
    service = module.get<CreateBankAccountHistoryService>(
      CreateBankAccountHistoryService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.execute with correct DTO and return the result', async () => {
      const dto: CreateBankaccounthistoryDto = {
        cpf_sender: '12345678910',
        cpf_recipient: '12345678910',
        transfer_type: TransferType.PIX_TRANSFER,
        description: Description.SENT,
        transfer_value: '1500.50',
      };

      const result = { success: true };
      mockCreateBankAccountHistoryService.execute.mockResolvedValue(result);

      const response = await controller.create(dto);

      expect(service.execute).toHaveBeenCalledWith(dto);
      expect(response).toBe(result);
    });
  });
});

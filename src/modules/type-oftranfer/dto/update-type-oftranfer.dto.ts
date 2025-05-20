import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeOftranferDto } from './create-type-oftranfer.dto';

export class UpdateTypeOftranferDto extends PartialType(
  CreateTypeOftranferDto,
) {}

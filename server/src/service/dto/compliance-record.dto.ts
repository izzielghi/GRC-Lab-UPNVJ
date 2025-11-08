/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { RecordItemDTO } from './record-item.dto';
import { BookingDTO } from './booking.dto';

/**
 * A ComplianceRecordDTO object.
 */
export class ComplianceRecordDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'dateTime field' })
  dateTime: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'isCompleted field' })
  isCompleted: boolean;

  @ApiProperty({ type: () => RecordItemDTO, isArray: true, description: 'recordItems relationship' })
  recordItems?: RecordItemDTO[];
  @ApiProperty({ type: () => BookingDTO, description: 'booking relationship' })
  booking?: BookingDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

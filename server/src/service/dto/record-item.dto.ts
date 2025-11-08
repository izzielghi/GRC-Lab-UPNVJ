/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { ChecklistItemDTO } from './checklist-item.dto';
import { ComplianceRecordDTO } from './compliance-record.dto';

/**
 * A RecordItemDTO object.
 */
export class RecordItemDTO extends BaseDTO {
  id?: number;

  @ApiProperty({ description: 'isCompliant field', required: false })
  isCompliant?: boolean;

  @ApiProperty({ type: () => ChecklistItemDTO, description: 'item relationship' })
  item?: ChecklistItemDTO;
  @ApiProperty({ type: () => ComplianceRecordDTO, description: 'record relationship' })
  record?: ComplianceRecordDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

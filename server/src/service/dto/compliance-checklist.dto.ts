/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ChecklistItemDTO } from './checklist-item.dto';

/**
 * A ComplianceChecklistDTO object.
 */
export class ComplianceChecklistDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'name field' })
  name: string;

  @ApiProperty({ description: 'dateTime field', required: false })
  dateTime?: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'isCompleted field' })
  isCompleted: boolean;

  @ApiProperty({ type: () => ChecklistItemDTO, isArray: true, description: 'checklistItems relationship' })
  checklistItems?: ChecklistItemDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

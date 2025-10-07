/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { ComplianceChecklistDTO } from './compliance-checklist.dto';

/**
 * A ChecklistItemDTO object.
 */
export class ChecklistItemDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'description field' })
  description: string;

  @ApiProperty({ description: 'isCompliant field', required: false })
  isCompliant?: boolean;

  @ApiProperty({ type: () => ComplianceChecklistDTO, description: 'checklist relationship' })
  checklist?: ComplianceChecklistDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

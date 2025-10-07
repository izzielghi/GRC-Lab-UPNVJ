/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { AssetDTO } from './asset.dto';

import { UserDTO } from './user.dto';

/**
 * A MaintenanceRecordDTO object.
 */
export class MaintenanceRecordDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'date field' })
  date: any;

  @ApiProperty({ description: 'description field' })
  description: any;

  @ApiProperty({ description: 'cost field', required: false })
  cost?: number;

  @ApiProperty({ description: 'nextServiceDate field', required: false })
  nextServiceDate?: any;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user?: UserDTO;
  @ApiProperty({ type: () => AssetDTO, description: 'asset relationship' })
  asset?: AssetDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

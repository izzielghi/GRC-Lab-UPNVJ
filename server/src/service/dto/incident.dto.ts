/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IncidentType } from '../../domain/enumeration/incident-type';
import { BaseDTO } from './base.dto';

import { AssetDTO } from './asset.dto';

import { UserDTO } from './user.dto';

/**
 * A IncidentDTO object.
 */
export class IncidentDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @ApiProperty({ description: 'description field' })
  description: any;

  @IsNotEmpty()
  @ApiProperty({ enum: IncidentType, description: 'type enum field' })
  type: IncidentType;

  @IsNotEmpty()
  @ApiProperty({ description: 'date field' })
  date: any;

  @ApiProperty({ description: 'mitigationAction field', required: false })
  mitigationAction?: any;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user?: UserDTO;
  @ApiProperty({ type: () => AssetDTO, description: 'asset relationship' })
  asset?: AssetDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

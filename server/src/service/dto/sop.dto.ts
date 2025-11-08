/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SOPStatus } from '../../domain/enumeration/sop-status';
import { BaseDTO } from './base.dto';

import { AssetDTO } from './asset.dto';

/**
 * A SOPDTO object.
 */
export class SOPDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'documentPath field' })
  documentPath: string;

  @ApiProperty({ description: 'version field', required: false })
  version?: string;

  @IsNotEmpty()
  @ApiProperty({ enum: SOPStatus, description: 'status enum field' })
  status: SOPStatus;

  @ApiProperty({ type: () => AssetDTO, isArray: true, description: 'assets relationship' })
  assets?: AssetDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

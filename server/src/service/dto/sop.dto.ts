/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
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

  @ApiProperty({ description: 'isActive field', required: false })
  isActive?: boolean;

  @ApiProperty({ type: () => AssetDTO, isArray: true, description: 'rules relationship' })
  rules?: AssetDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

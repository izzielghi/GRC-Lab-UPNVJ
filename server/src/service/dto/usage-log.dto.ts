/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { BaseDTO } from './base.dto';

import { RoomDTO } from './room.dto';
import { AssetDTO } from './asset.dto';

import { UserDTO } from './user.dto';

/**
 * A UsageLogDTO object.
 */
export class UsageLogDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'dateTime field' })
  dateTime: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'purpose field' })
  purpose: string;

  @Min(1)
  @ApiProperty({ description: 'duration field', required: false })
  duration?: number;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user?: UserDTO;
  @ApiProperty({ type: () => RoomDTO, description: 'room relationship' })
  room?: RoomDTO;
  @ApiProperty({ type: () => AssetDTO, description: 'asset relationship' })
  asset?: AssetDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

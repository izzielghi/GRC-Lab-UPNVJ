/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { AssetCondition } from '../../domain/enumeration/asset-condition';
import { BaseDTO } from './base.dto';

import { MaintenanceRecordDTO } from './maintenance-record.dto';
import { IncidentDTO } from './incident.dto';
import { RoomDTO } from './room.dto';
import { SOPDTO } from './sop.dto';
import { BookingDTO } from './booking.dto';

/**
 * A AssetDTO object.
 */
export class AssetDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'name field' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'code field' })
  code: string;

  @ApiProperty({ enum: AssetCondition, description: 'condition enum field', required: false })
  condition?: AssetCondition;

  @ApiProperty({ description: 'purchaseDate field', required: false })
  purchaseDate?: any;

  @ApiProperty({ description: 'warrantyEndDate field', required: false })
  warrantyEndDate?: any;

  @ApiProperty({ description: 'description field', required: false })
  description?: string;

  @ApiProperty({ type: () => MaintenanceRecordDTO, isArray: true, description: 'maintenanceRecords relationship' })
  maintenanceRecords?: MaintenanceRecordDTO[];
  @ApiProperty({ type: () => IncidentDTO, isArray: true, description: 'incidents relationship' })
  incidents?: IncidentDTO[];
  @ApiProperty({ type: () => RoomDTO, description: 'location relationship' })
  location?: RoomDTO;
  @ApiProperty({ type: () => SOPDTO, isArray: true, description: 'rules relationship' })
  rules?: SOPDTO[];
  @ApiProperty({ type: () => BookingDTO, isArray: true, description: 'bookings relationship' })
  bookings?: BookingDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

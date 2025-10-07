/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { BookingDTO } from './booking.dto';
import { UsageLogDTO } from './usage-log.dto';

/**
 * A RoomDTO object.
 */
export class RoomDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'name field' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'code field' })
  code: string;

  @ApiProperty({ description: 'capacity field', required: false })
  capacity?: number;

  @ApiProperty({ description: 'locationDetails field', required: false })
  locationDetails?: string;

  @ApiProperty({ type: () => BookingDTO, isArray: true, description: 'bookings relationship' })
  bookings?: BookingDTO[];
  @ApiProperty({ type: () => UsageLogDTO, isArray: true, description: 'rooms relationship' })
  rooms?: UsageLogDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

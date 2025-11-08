/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { BookingDTO } from './booking.dto';

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

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

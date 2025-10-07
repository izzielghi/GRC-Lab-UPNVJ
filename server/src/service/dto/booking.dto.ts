/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../../domain/enumeration/booking-status';
import { BaseDTO } from './base.dto';

import { RoomDTO } from './room.dto';

import { UserDTO } from './user.dto';

/**
 * A BookingDTO object.
 */
export class BookingDTO extends BaseDTO {
  id?: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'startTime field' })
  startTime: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'endTime field' })
  endTime: any;

  @IsNotEmpty()
  @ApiProperty({ description: 'purpose field' })
  purpose: string;

  @ApiProperty({ enum: BookingStatus, description: 'status enum field', required: false })
  status?: BookingStatus;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user?: UserDTO;
  @ApiProperty({ type: () => RoomDTO, description: 'room relationship' })
  room?: RoomDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

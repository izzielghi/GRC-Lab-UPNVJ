/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Room } from './room.entity';
import { BookingStatus } from './enumeration/booking-status';

import { User } from './user.entity';

/**
 * A Booking.
 */
@Entity('booking')
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'datetime', name: 'start_time' })
  startTime: any;

  @Column({ type: 'datetime', name: 'end_time' })
  endTime: any;

  @Column({ name: 'purpose' })
  purpose: string;

  @Column({ type: 'simple-enum', name: 'status', enum: BookingStatus })
  status?: BookingStatus;

  @ManyToOne(type => User)
  user?: User;

  @ManyToOne(type => Room)
  room?: Room;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Booking } from './booking.entity';
import { UsageLog } from './usage-log.entity';

/**
 * A Room.
 */
@Entity('room')
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ type: 'integer', name: 'capacity', nullable: true })
  capacity?: number;

  @Column({ name: 'location_details', nullable: true })
  locationDetails?: string;

  @ManyToMany(type => Booking)
  bookings?: Booking[];

  @OneToMany(type => UsageLog, other => other.room)
  rooms?: UsageLog[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

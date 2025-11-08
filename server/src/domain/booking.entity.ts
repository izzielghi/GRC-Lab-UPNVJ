/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ComplianceRecord } from './compliance-record.entity';
import { Asset } from './asset.entity';
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

  @Column({ name: 'title' })
  title: string;

  @Column({ type: 'datetime', name: 'start_time' })
  startTime: any;

  @Column({ type: 'datetime', name: 'end_time' })
  endTime: any;

  @Column({ name: 'purpose' })
  purpose: string;

  @Column({ type: 'simple-enum', name: 'status', enum: BookingStatus })
  status?: BookingStatus;

  @Column({ name: 'notes', nullable: true })
  notes?: string;

  @OneToOne(type => ComplianceRecord)
  @JoinColumn()
  complianceRecord?: ComplianceRecord;

  @ManyToOne(type => User)
  user?: User;

  @ManyToMany(type => Asset)
  @JoinTable({
    name: 'rel_booking__asset',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'asset_id', referencedColumnName: 'id' },
  })
  assets?: Asset[];

  @ManyToMany(type => Room)
  @JoinTable({
    name: 'rel_booking__room',
    joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'room_id', referencedColumnName: 'id' },
  })
  rooms?: Room[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

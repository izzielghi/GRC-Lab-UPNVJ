/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { RecordItem } from './record-item.entity';
import { Booking } from './booking.entity';

/**
 * A ComplianceRecord.
 */
@Entity('compliance_record')
export class ComplianceRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'datetime', name: 'date_time' })
  dateTime: any;

  @Column({ type: 'boolean', name: 'is_completed' })
  isCompleted: boolean;

  @OneToMany(type => RecordItem, other => other.record)
  recordItems?: RecordItem[];

  @OneToOne(type => Booking)
  booking?: Booking;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

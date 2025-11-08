/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Asset } from './asset.entity';

import { User } from './user.entity';

/**
 * A MaintenanceRecord.
 */
@Entity('maintenance_record')
export class MaintenanceRecord extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'date', name: 'date' })
  date: any;

  @Column({ name: 'description' })
  description: string;

  @Column({ type: 'decimal', name: 'cost', precision: 10, scale: 2, nullable: true })
  cost?: number;

  @Column({ type: 'date', name: 'next_service_date', nullable: true })
  nextServiceDate?: any;

  @ManyToOne(type => User)
  maintainer?: User;

  @ManyToOne(type => Asset)
  asset?: Asset;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

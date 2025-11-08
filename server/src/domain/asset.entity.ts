/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { MaintenanceRecord } from './maintenance-record.entity';
import { Incident } from './incident.entity';
import { Room } from './room.entity';
import { SOP } from './sop.entity';
import { Booking } from './booking.entity';
import { AssetCondition } from './enumeration/asset-condition';

/**
 * A Asset.
 */
@Entity('asset')
export class Asset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'code', unique: true })
  code: string;

  @Column({ type: 'simple-enum', name: 'jhi_condition', enum: AssetCondition })
  condition?: AssetCondition;

  @Column({ type: 'date', name: 'purchase_date', nullable: true })
  purchaseDate?: any;

  @Column({ type: 'date', name: 'warranty_end_date', nullable: true })
  warrantyEndDate?: any;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @OneToMany(type => MaintenanceRecord, other => other.asset)
  maintenanceRecords?: MaintenanceRecord[];

  @OneToMany(type => Incident, other => other.asset)
  incidents?: Incident[];

  @ManyToOne(type => Room)
  location?: Room;

  @ManyToMany(type => SOP)
  @JoinTable({
    name: 'rel_asset__rule',
    joinColumn: { name: 'asset_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'rule_id', referencedColumnName: 'id' },
  })
  rules?: SOP[];

  @ManyToMany(type => Booking)
  bookings?: Booking[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

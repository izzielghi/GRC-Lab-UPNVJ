/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { UsageLog } from './usage-log.entity';
import { MaintenanceRecord } from './maintenance-record.entity';
import { Incident } from './incident.entity';
import { SOP } from './sop.entity';
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

  @Column({ name: 'location', nullable: true })
  location?: string;

  @Column({ type: 'simple-enum', name: 'jhi_condition', enum: AssetCondition })
  condition?: AssetCondition;

  @Column({ type: 'date', name: 'purchase_date', nullable: true })
  purchaseDate?: any;

  @Column({ type: 'date', name: 'warranty_end_date', nullable: true })
  warrantyEndDate?: any;

  @OneToMany(type => UsageLog, other => other.asset)
  usageLogs?: UsageLog[];

  @OneToMany(type => MaintenanceRecord, other => other.asset)
  maintenanceRecords?: MaintenanceRecord[];

  @OneToMany(type => Incident, other => other.asset)
  incidents?: Incident[];

  @ManyToMany(type => SOP)
  @JoinTable({
    name: 'rel_asset__sop',
    joinColumn: { name: 'asset_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sop_id', referencedColumnName: 'id' },
  })
  sOPS?: SOP[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

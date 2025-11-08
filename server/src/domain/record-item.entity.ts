/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChecklistItem } from './checklist-item.entity';
import { ComplianceRecord } from './compliance-record.entity';

/**
 * A RecordItem.
 */
@Entity('record_item')
export class RecordItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'boolean', name: 'is_compliant', nullable: true })
  isCompliant?: boolean;

  @ManyToOne(type => ChecklistItem)
  item?: ChecklistItem;

  @ManyToOne(type => ComplianceRecord)
  record?: ComplianceRecord;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

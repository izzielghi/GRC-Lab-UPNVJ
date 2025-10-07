/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChecklistItem } from './checklist-item.entity';

/**
 * A ComplianceChecklist.
 */
@Entity('compliance_checklist')
export class ComplianceChecklist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ type: 'datetime', name: 'date_time', nullable: true })
  dateTime?: any;

  @Column({ type: 'boolean', name: 'is_completed' })
  isCompleted: boolean;

  @OneToMany(type => ChecklistItem, other => other.checklist)
  checklistItems?: ChecklistItem[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

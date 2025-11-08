/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ChecklistItem } from './checklist-item.entity';
import { SOP } from './sop.entity';

/**
 * A ComplianceChecklist.
 */
@Entity('compliance_checklist')
export class ComplianceChecklist extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @OneToMany(type => ChecklistItem, other => other.checklist)
  checklistItems?: ChecklistItem[];

  @ManyToOne(type => SOP)
  sop?: SOP;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

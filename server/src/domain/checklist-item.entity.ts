/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ComplianceChecklist } from './compliance-checklist.entity';

/**
 * A ChecklistItem.
 */
@Entity('checklist_item')
export class ChecklistItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'description' })
  description: string;

  @ManyToOne(type => ComplianceChecklist)
  checklist?: ComplianceChecklist;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Asset } from './asset.entity';
import { SOPStatus } from './enumeration/sop-status';

/**
 * A SOP.
 */
@Entity('sop')
export class SOP extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'document_path' })
  documentPath: string;

  @Column({ name: 'version', nullable: true })
  version?: string;

  @Column({ type: 'simple-enum', name: 'status', enum: SOPStatus })
  status: SOPStatus;

  @ManyToMany(type => Asset)
  assets?: Asset[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

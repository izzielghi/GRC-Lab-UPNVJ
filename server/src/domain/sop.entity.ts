/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Asset } from './asset.entity';

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

  @Column({ type: 'boolean', name: 'is_active', nullable: true })
  isActive?: boolean;

  @ManyToMany(type => Asset)
  rules?: Asset[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

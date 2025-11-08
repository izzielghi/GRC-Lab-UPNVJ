/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Asset } from './asset.entity';
import { IncidentType } from './enumeration/incident-type';

import { User } from './user.entity';

/**
 * A Incident.
 */
@Entity('incident')
export class Incident extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ type: 'simple-enum', name: 'type', enum: IncidentType })
  type: IncidentType;

  @Column({ type: 'datetime', name: 'date' })
  date: any;

  @Column({ name: 'mitigation_action', nullable: true })
  mitigationAction?: string;

  @ManyToOne(type => User)
  reporter?: User;

  @ManyToOne(type => Asset)
  asset?: Asset;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

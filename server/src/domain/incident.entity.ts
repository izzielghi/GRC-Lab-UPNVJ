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

  @Column({ type: 'blob', name: 'description' })
  description: any;

  @Column({ type: 'simple-enum', name: 'type', enum: IncidentType })
  type: IncidentType;

  @Column({ type: 'datetime', name: 'date' })
  date: any;

  @Column({ type: 'blob', name: 'mitigation_action', nullable: true })
  mitigationAction?: any;

  @ManyToOne(type => User)
  user?: User;

  @ManyToOne(type => Asset)
  asset?: Asset;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

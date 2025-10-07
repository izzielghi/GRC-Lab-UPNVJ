/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Room } from './room.entity';
import { Asset } from './asset.entity';

import { User } from './user.entity';

/**
 * A UsageLog.
 */
@Entity('usage_log')
export class UsageLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'datetime', name: 'date_time' })
  dateTime: any;

  @Column({ name: 'purpose' })
  purpose: string;

  @Column({ type: 'integer', name: 'duration', nullable: true })
  duration?: number;

  @ManyToOne(type => User)
  user?: User;

  @ManyToOne(type => Room)
  room?: Room;

  @ManyToOne(type => Asset)
  asset?: Asset;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}

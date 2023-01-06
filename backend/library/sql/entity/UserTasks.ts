import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';

import { Tasks } from './Tasks';
import { User } from './User';

import { Status } from '../../../constant/constant';

@Entity()
export class UserTasks {
  
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  created_at: Date

  
  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status
}
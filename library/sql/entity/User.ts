import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Tasks } from './Tasks';

import { Status } from '../../../constant/constant';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_name: string

  @Column()
  email: string

  @Column()
  password: string
  
  @Column({ type: 'text', nullable: true})
  access_token: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status

  @CreateDateColumn()
  created_at: Date

  @Column()
  created_by: number

  @ManyToMany(()=> Tasks)
  @JoinTable()
  userTasks: Tasks[]
}
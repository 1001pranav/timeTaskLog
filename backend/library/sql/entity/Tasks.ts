import {
  Column,
  CreateDateColumn,
  Entity, JoinTable, ManyToMany, ManyToOne,
  OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Status, TaskPriority, TaskType } from '../../../constant/index';
// const {Status, TaskPriority, TaskType} = require('../../../constant/index');
import {User} from './User';
@Entity()
export class Tasks {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({nullable: true})
  description: string

  @Column({ type: 'timestamp', nullable: true })
  start_time: Date

  @Column({ type: 'timestamp', nullable: true })
  end_time: Date

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.MAIN
  })
  task_type: TaskType

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.NOT_IMPORTANT
  })
  task_priority: TaskPriority

  @Column({
    default: 0
  })  
  competition_percentage: number

  @Column('time', {default: "00:00:00"})
  total_time: Date;

  @Column({type: 'time', default: '00:00:00'})
  spent_time: Date;
  
  @CreateDateColumn()
  created_at: Date

  @Column()
  created_by: number

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE
  })
  status: Status

  @OneToMany(() => Tasks, (task) => task.mainTask)
  SubTask: Tasks[]

  @ManyToOne(()=> Tasks, (tasks) => tasks.SubTask)
  mainTask: Tasks

  @ManyToMany(()=> User, (User) => User.userTasks)
  @JoinTable()
  userTasks: User[];
}
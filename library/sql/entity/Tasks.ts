import {
  Column,
  CreateDateColumn,
  Entity, ManyToOne,
  OneToMany, PrimaryGeneratedColumn
} from 'typeorm';

import { Status, TaskType } from '../../../constant/constant';

@Entity()
export class Tasks {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({ type: 'timestamp' })
  start_time: Date

  @Column({ type: 'timestamp' })
  end_time: Date

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.MAIN
  })
  task_type: TaskType

  @Column()
  competition_percentage: number

  @CreateDateColumn()
  created_by: Date

  @Column()
  created_at: number

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


}
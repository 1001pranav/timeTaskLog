import { UserDB, Status, TaskPriority, TaskType } from "../index"

export interface TasksDB {
  id: number,
  name: string, 
  competition_percentage: number, 
  start_time: Date | null, 
  end_time: Date | null,
  total_time: Date | null,
  spent_time: Date| null,
  task_type: TaskType,
  task_priority: TaskPriority,
  created_by: number,
  created_at: Date
  status: Status,
  description: string | null ,
  SubTask: Array<TasksDB>,
  // UserTasks: Array<UserDB>
}

export interface addTasks {
  name: string, 
  completionPercentage: number,
  startTime: Date | null, 
  endTime: Date | null,
  totalTime: Date | null;
  spentTime: Date | null;
  taskType: TaskType,
  taskPriority: TaskPriority,
  createdBy: number,
  status: Status,
  description: string | null
  userData: UserDB
}

export interface UpdateTask {
  [key: string]: number | string
}

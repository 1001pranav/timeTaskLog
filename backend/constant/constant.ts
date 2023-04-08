
const jsonSecret = "exabc_asdwec4424_sda"

export { jsonSecret }; //why it is used? it can be declared in line 2 right?

export enum Status {
  ACTIVE = 1,
  INACTIVE = 2,
  DELETED = 3,
  COMPLETED = 4
}

export enum TaskType {
  MAIN = 1,
  SUB_TASK = 2,
  DAILY_TASK = 3,
  YEARLY_TASK = 4 
}

export enum TaskPriority {
  IMPORTANT_MUST = 1,
  IMPORTANT = 2,
  NOT_IMPORTANT_MUST = 3,
  NOT_IMPORTANT = 4,
}

export interface userData {
  userName: string, 
  email: string, 
  password: string
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
}

export interface userDB {
  id: number,
  user_name: string,
  email: string,
  password: string,
  access_token: string,
  status: Status,
  created_at: Date,
  userTasks: Array<tasksDB>
}

export interface tasksDB {
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
  SubTask: Array<tasksDB>
}

export interface updateTask {
  [key: string]: number | string
}

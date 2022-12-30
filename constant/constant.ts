const jsonSecret = "exabc_asdwec4424_sda"

export { jsonSecret };

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

export interface userData {
  userName: string, 
  email: string, 
  password: string,
  createdBy: number 
}

export interface tasks {
  name: string, 
  completionPercentage: number,
  startTime: Date | null, 
  endTime: Date | null,
  taskType: TaskType,
  createdBy: number,
  status: Status,
  description: string | null
}


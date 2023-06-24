
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

export enum TaskPriority {
  IMPORTANT_MUST = 1,
  IMPORTANT = 2,
  NOT_IMPORTANT_MUST = 3,
  NOT_IMPORTANT = 4,
}

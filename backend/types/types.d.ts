import { TaskType, TaskPriority, Status } from "../constant/constant"

interface addTasks {
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
  userData: userDB
}


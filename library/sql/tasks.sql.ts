import { addTasks, Status, tasksDB, TaskType, updateTask } from "../../constant/constant";
import { AppDataSource } from "./dataSource";
import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";



const addTasks = async (
  taskObj: addTasks
) :Promise<object> => {
  const tasks = new Tasks();
  tasks.name = taskObj.name;
  tasks.description = taskObj.description
  tasks.start_time = taskObj.startTime;
  tasks.end_time = taskObj.endTime;
  tasks.task_type = taskObj.taskType;
  tasks.competition_percentage =  taskObj.completionPercentage;
  tasks.status = taskObj.status;
  tasks.created_by = taskObj.createdBy;
  
  await AppDataSource.manager.save(tasks);
  
  return tasks;
};

const updateTask = async ( taskObj: updateTask, task_id: number) => {
  await AppDataSource.manager.update(Tasks, {id: task_id}, taskObj);
}
export {
  addTasks,
  updateTask
};

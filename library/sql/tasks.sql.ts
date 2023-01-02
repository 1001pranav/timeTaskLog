import { addTasks, Status, tasksDB, TaskType, updateTask } from "../../constant/constant";
import { AppDataSource } from "./dataSource";
import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

const addTasks = async (
  taskObj: addTasks
) :Promise<tasksDB> => {
  const tasks = new Tasks();
  tasks.name = taskObj.name;
  tasks.description = taskObj.description
  tasks.start_time = taskObj.startTime;
  tasks.end_time = taskObj.endTime;
  tasks.spent_time = taskObj.spentTime;
  tasks.total_time = taskObj.totalTime;
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

const addSubTasks = async (taskObj: tasksDB, taskID: number ) => {
  const subTaskAdd: Array<tasksDB> = await AppDataSource.getRepository(Tasks).find({
    where: {
      id: taskID
    }
  })
  
  if ( subTaskAdd[0] ) {
    subTaskAdd[0].SubTask.push(taskObj)
    await AppDataSource.getRepository(Tasks).save(subTaskAdd)
  }
}
export {
  addTasks,
  updateTask,
  addSubTasks
};

import { Raw, Not } from "typeorm";

import { Status, TaskType, UserDB } from "../../constant/index";
import { AppDataSource } from "./dataSource";

import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

const listUserTasks = async (user_id: number, taskType: TaskType ) :Promise<Array<UserDB>> => {
console.log(taskType);

const userRepository = AppDataSource.getRepository(User);

  return await userRepository.find({
    where: {
      id: user_id,
      status: Not(Status.DELETED),
      userTasks: {
        status: Not(Status.DELETED),
        task_type: taskType? taskType: null,
      }
    },
    relations: {
      userTasks: true,
    },
    // take: 1,
    // skip: 0
  })
  // return await userRepository
  //   .createQueryBuilder('User')
  //   .leftJoin('user.tasks', 'userTasks')
  //   .where("id = :id", {id: user_id})
  //   .orderBy("userTasks.id")
  //   .skip(1)
  //   .take(1)
  //   .getMany()
}

const listUserTaskByID = async(user_id: number, task_id: number): Promise<UserDB> => {

  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: {
      id: user_id,
      status: Not(Status.DELETED),  
      userTasks: {
        id: task_id,
        status: Not(Status.DELETED)
      },
    }, 
    relations: {
      userTasks: true,
    }
  })
}

const listUserSubTask = async( user_id: number, task_id: number ): Promise<Array<UserDB>> => {
  return await AppDataSource.manager
    .getRepository(User)
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.userTasks','tasks')
    .innerJoinAndSelect('tasks.SubTask', 'subTask')
    .where('user.id = :id', {id: user_id})
    .andWhere('tasks.id = :taskID', {taskID: task_id})
    .getMany()
}

const avgSubTask = async(task_id: number, user_id: number): Promise<Number> => {
  let avg: Number = 0;

  const data = await AppDataSource.manager
    .getRepository(User)
    .createQueryBuilder("user")
    .select("AVG(subTask.competition_percentage)", "avg")
    .where("mainTaskId = :id", {id: task_id})
    .innerJoinAndSelect('user.userTasks','tasks')
    .innerJoinAndSelect('tasks.SubTask', 'subTask')
    .where('user.id = :id', {id: user_id})
    .andWhere('tasks.id = :taskID', {taskID: task_id})
    .getOne()
  
  console.log({data});
  
  avg = +data?? 0;

  return avg;
}

const countSubTasks = async(task_id: Number, user_id: Number): Promise<Number> => {
  
  let taskCount:number = 0;
  const data = await AppDataSource.manager
    .getRepository(User)
    .createQueryBuilder("tasks")
    .select("subTask.id")
    .innerJoinAndSelect('user.userTasks','user')
    .innerJoinAndSelect('tasks.mainTask', 'subTask')
    .where('user.id = :id', {id: user_id})
    .andWhere('tasks.id = :taskID', {taskID: task_id})
    .getMany()



  console.log({data:JSON.stringify(data), task_id});
  
  taskCount =  0; 
  return taskCount;
}

const getDailyTasks = async(user_id: number): Promise<Array<UserDB>> => {

  const date: number = new Date().getDate();
  const month: number = new Date().getMonth() + 1;
  const year: number = new Date().getFullYear(); 

  const todayDate: string = year + "-" + month + "-" + date; 
  const startDate: string = todayDate+ " 00:00:00";
  const endDate:string = todayDate+ " 23:59:59";

  const userRepository = AppDataSource.getRepository(User);
  return userRepository
  .find({
    relations:{
      userTasks: true
    },
    where: {
      id: user_id,
      status: Not(Status.DELETED),
      userTasks:{
        start_time: Raw((alias)=> `${alias} > :startDate`, {startDate}),
        end_time: Raw((alias)=> `${alias} < :endDate`, {endDate})
      }
    }
  })
}
export {
  listUserTasks,
  listUserTaskByID,
  listUserSubTask,
  avgSubTask,
  countSubTasks,
  getDailyTasks,
};

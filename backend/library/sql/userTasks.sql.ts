import { Raw, Not } from "typeorm";

import { Status, TaskType, userDB } from "../../constant/constant";
import { AppDataSource } from "./dataSource";

import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

const listUserTasks = async (user_id: number, taskType: TaskType ) :Promise<Array<userDB>> => {
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

const listUserTaskByID = async(user_id: number, task_id: number): Promise<userDB> => {

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

const listUserSubTask = async( user_id: number, task_id: number ): Promise<Array<userDB>> => {
  return await AppDataSource.manager
    .getRepository(User)
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.userTasks','tasks')
    .innerJoinAndSelect('tasks.SubTask', 'subTask')
    .where('user.id = :id', {id: user_id})
    .andWhere('tasks.id = :taskID', {taskID: task_id})
    .getMany()
}

const avgTask = async(task_id: number): Promise<Number> => {
  let avg: Number = 0;

  const data:{avg: null|number} = await AppDataSource.manager
    .getRepository(Tasks)
    .createQueryBuilder("tasks")
    .select("AVG(competition_percentage)", "avg")
    .where("mainTaskId = :id", {id: task_id})
    .getRawOne();
  
  avg = +data.avg?? 0
  return avg;
}

const countTasks = async(task_id: Number): Promise<Number> => {
  
  let taskCount:number = 0;
  const data: { count: null|number } = await AppDataSource.manager
    .getRepository("tasks")
    .createQueryBuilder("tasks")
    .select("COUNT(id)", "count")
    .where("mainTaskId = :id", {id: task_id})
    .getRawOne();
  
  taskCount = +data.count?? 0; 
  return taskCount;
}

const getDailyTasks = async(user_id: number): Promise<Array<userDB>> => {

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
  avgTask,
  countTasks,
  getDailyTasks,
};

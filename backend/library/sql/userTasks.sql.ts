import { getManager, Not } from "typeorm";

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
export {
  listUserTasks,
  listUserTaskByID,
  listUserSubTask
};

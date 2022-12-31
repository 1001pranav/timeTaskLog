import { userDB } from "../../constant/constant";
import { AppDataSource } from "./dataSource";

import { Tasks } from "./entity/Tasks";
import { User } from "./entity/User";

const listUserTasks = async (user_id: number ) :Promise<object> => {

const userRepository = AppDataSource.getRepository(User);
  return await userRepository.find({
    where: {
      id: user_id,
    },
    relations: {
      userTasks: true
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
const listUserTaskByID = async(user_id: number, task_id: number): Promise<object> => {

  const userRepository = AppDataSource.getRepository(User);
  return await userRepository.findOne({
    where: {
      id: user_id,
      userTasks: {
        id: task_id
      } 
    }, 
    relations: {
      userTasks: true
    }
  })
}
export {
  listUserTasks,
  listUserTaskByID
};